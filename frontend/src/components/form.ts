import {CustomHttp} from "../services/custom-http";
import {Auth} from "../services/auth";
import config from "../../config/config";
import * as path from "path";
import {FormFieldType} from "../types/form-field.type";
import {SignupResponseType} from "../types/signup-response.type";
import {LoginResponseType} from "../types/login-response.type";

export class Form {
    readonly agreeElement: HTMLInputElement | null;
    readonly processElement: HTMLElement | null;
    readonly page: 'signup' | 'login';
    private fields: FormFieldType[] = [];

    constructor(page: 'signup' | 'login') {
        this.agreeElement = null;
        this.processElement = null;
        this.page = page;
        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey); //проверяем есть ли в localStorage accessTokenKey
        if (accessToken) {
            location.href = '#/choice';
            return;
        }

        this.fields = [  //два поля у нас будут на обоих страницах
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, //регулярка для проверки email
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, //регулярка для пароля
                /* (?=.*\d)          // should contain at least one digit
                (?=.*[a-z])       // should contain at least one lower case
                (?=.*[A-Z])       // should contain at least one upper case
                [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters  */
                valid: false,
            },
        ];

        if (this.page === 'signup') {  //если мы на signup, то нужны поля name и lastName
            this.fields.unshift({ //добавляем их в начало this.fields
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/, //регулярка Первая заглавная + любое кол-во букв
                    valid: false,
                },
                {
                    name: 'lastName',
                    id: 'last-name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/, //регулярка Первая заглавная + любое кол-во букв
                    valid: false,
                });
        }

        const that: Form = this;
        this.fields.forEach((item: FormFieldType) => {
            item.element = document.getElementById(item.id) as HTMLInputElement;
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, <HTMLInputElement>this)
                }
            }
        });
        this.processElement = document.getElementById('process');
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm();
            }
        }


        if (this.page === 'signup') {
            this.agreeElement = document.getElementById('agree') as HTMLInputElement;
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                }
            }
        }
    }


    private validateField(field: FormFieldType, element: HTMLInputElement): void {
        if (element.parentNode) {
            if (!element.value || !element.value.match(field.regex)) {
                (element.parentNode as HTMLElement).style.borderColor = 'red'; //красим рамку родителю
                field.valid = false;
            } else {
                (element.parentNode as HTMLElement).removeAttribute('style'); // удалим покраску родительской рамки
                field.valid = true;
            }
        }
        this.validateForm();
    }

    private validateForm(): boolean {
        const validForm: boolean = this.fields.every(item => item.valid);
        const isValid: boolean = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        // если this.agreeElement true, то проверяем checked && validForm, иначе только validForm
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute('disabled')
            } else {
                this.processElement.setAttribute('disabled', 'disabled')
            }
        }
        return isValid;
    }

    private async   processForm(): Promise<void> {
        if (this.validateForm()) {
            // выносим отдельно поиск значений email и password, потому что они нужны и при регистрации и при входе.
            const email = this.fields.find(item => item.name === 'email')?.element?.value;
            const password = this.fields.find(item => item.name === 'password')?.element?.value;

            if (this.page === 'signup') { //если мы на странице signup
                //закидываем на бэкенд в body введенные поля пользователя:
                try {
                    const result: SignupResponseType = await CustomHttp.request(config.host + '/signup', "POST", {
                        name: this.fields.find(item => item.name === 'name')?.element?.value,
                        lastName: this.fields.find(item => item.name === 'lastName')?.element?.value,
                        email: email,
                        password: password,
                    });

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }
                    }
                } catch (error) {
                    console.log(error); // нужно выйти из функции, если ошибка при регистрации
                    return;
                }
            }
            //и в любом случае пытаемся авторизоваться
            try {
                const result: LoginResponseType = await CustomHttp.request(config.host + '/login', "POST", {
                    email: email,
                    password: password,
                });

                if (result) {
                    if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.accessToken, result.refreshToken);
                    Auth.setUserInfo({
                        fullName: result.fullName,
                        userId: result.userId
                    })
                    Auth.setUserEmail(result.email);
                    location.href = '#/choice'; //переводим пользователя на новую страницу
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}