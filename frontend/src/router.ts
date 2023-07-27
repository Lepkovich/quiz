import {Form} from "./components/form";
import {Choice} from "./components/choice";
import {Test} from "./components/test";
import {Result} from "./components/result";
import {Answers} from "./components/answers";
import {Auth} from "./services/auth";
import {RouteType} from "./types/route.type";
import {UserInfoType} from "./types/user-info.type";

export class Router {
    readonly contentElement: HTMLElement | null;
    readonly stylesElement: HTMLElement | null;
    readonly titleElement: HTMLElement | null;
    readonly profileElement: HTMLElement | null;
    readonly profileFullNameElement: HTMLElement | null;
    private routes: RouteType[];
    constructor() {

        this.contentElement = document.getElementById('content'),
        this.stylesElement = document.getElementById('styles'),
        this.titleElement = document.getElementById('title'),
        this.profileElement = document.getElementById('profile'),
        this.profileFullNameElement = document.getElementById('profile-full-name'),

        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: () => {
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему ',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/choice',
                title: 'Выбор теста',
                template: 'templates/choice.html',
                styles: 'styles/choice.css',
                load: () => {
                    new Choice();
                }
            },
            {
                route: '#/test',
                title: 'Прохождение теста',
                template: 'templates/test.html',
                styles: 'styles/test.css',
                load: () => {
                    new Test();
                }
            },
            {
                route: '#/result',
                title: 'Результат',
                template: 'templates/result.html',
                styles: 'styles/result.css',
                load: () => {
                    new Result();
                }
            },
            {
                route: '#/answers',
                title: 'Ответы на тест',
                template: 'templates/answers.html',
                styles: 'styles/answers.css',
                load: () => {
                    new Answers();
                }
            },
        ]
    }

    public async openRoute(): Promise<void> { // функция выберет какой роут загрузить исходя из текста в адресной строке
        const urlRoute: string =  window.location.hash.split('?')[0];//split разделит адресную строку до ?, а [0] возьмет первую часть
        if (urlRoute === '#/logout') {
            await Auth.logOut();
            window.location.href = '#/';
            return;

        }
        const newRoute: RouteType | undefined = this.routes.find(item => {
            return item.route === urlRoute;
        })
        if(!newRoute) { // если мы не найдем в адресной строке ничего из перечисленного в routes, загрузим главную страницу нашего SPA
            window.location.href = '#/';
            return; // обязательно нужно завершить эту функцию, чтобы дальше ничего за ней не происходило.
        }

        if (!this.contentElement || !this.stylesElement || !this.titleElement || !this.profileElement || !this.profileFullNameElement) {
            if (urlRoute === '#/') {
                return;
            } else {
                window.location.href = '#/';
                return;
            }
        }
        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;
        const userInfo: UserInfoType | null = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        const accessToken = localStorage.getItem(Auth.accessTokenKey); //проверяем есть ли в localStorage accessTokenKey
        if (userInfo && accessToken) { //если да
            this.profileElement.style.display = 'flex'; //отображаем блок пользователя
            this.profileFullNameElement.innerText = userInfo.fullName; //пишем имя пользователя
        } else {
            this.profileElement.style.display = 'none'; //скрываем блок пользователя
        }
        newRoute.load();
    }
}