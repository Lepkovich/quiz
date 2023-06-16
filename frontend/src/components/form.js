export class Form {

    constructor(page) {
        this.agreeElement = null;
        this.processElement = null;
        this.page = page;

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

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this)
            }
        });
        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }

        if (this.page === 'signup') {
            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        }
    }


    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.parentNode.style.borderColor = 'red'; //красим рамку родителю
            field.valid = false;
        } else {
            element.parentNode.removeAttribute('style'); // удалим покраску родительской рамки
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
                      // если this.agreeElement true, то проверяем checked && validForm, иначе только validForm
        if (isValid) {
            this.processElement.removeAttribute('disabled')
        } else {
            this.processElement.setAttribute('disabled', 'disabled')
        }
        return isValid;
    }

    async processForm() {
        if (this.validateForm()) {

            if (this.page === 'signup'){
                //закидываем на бэкенд в body введенные поля пользователя:
                try {
                    const response = await fetch('http://localhost:3000/api/signup', {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            name: this.fields.find(item => item.name === 'name').element.value,
                            lastName: this.fields.find(item => item.name === 'lastName').element.value,
                            email: this.fields.find(item => item.name === 'email').element.value,
                            password: this.fields.find(item => item.name === 'password').element.value,
                        })
                    });
                    // ловим ошибку ответа сервера
                    if (response.status >= 200 && response.status < 300) {
                        throw new Error(response.message)
                    }

                    const result = await response.json()
                    if (result) {
                        if (result.error || result.user) {
                            throw new Error(result.message);
                        }
                        location.href = '#/choice'; //переводим пользователя на новую страницу
                    }
                } catch (error) {
                    console.log(error);
                }

            } else {

            }
        }
    }
}