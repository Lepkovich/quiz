import {Form} from "./components/form.js";
import {Choice} from "./components/choice.js";
import {Test} from "./components/test.js";
import {Result} from "./components/result.js";
import {Answers} from "./components/answers.js";
import {Auth} from "./services/auth.js";

export class Router {

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

    async openRoute() { // функция выберет какой роут загрузить исходя из текста в адресной строке
        const urlRoute =  window.location.hash.split('?')[0];//split разделит адресную строку до ?, а [0] возьмет первую часть
        if (urlRoute === '#/logout') {
             Auth.removeTokens();
             localStorage.removeItem(Auth.userInfoKey);
            window.location.href = '#/';
            return;

        }
        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        })
        if(!newRoute) { // если мы не найдем в адресной строке ничего из перечисленного в routes, загрузим главную страницу нашего SPA
            window.location.href = '#/';
            return; // обязательно нужно завершить эту функцию, чтобы дальше ничего за ней не происходило.
        }

        this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;
        const userInfo = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
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