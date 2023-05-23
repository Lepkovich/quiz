import {Form} from "./components/form.js";

export class Router {
    constructor() {
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
                route: 'form',
                title: 'Регистрация',
                template: 'templates/form.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form();
                }
            },
        ]

    }

    openRoute() { // функция выберет какой роут загрузить исходя из текста в адресной строке
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        })

        if(!newRoute) { // если мы не найдем в адресной строке ничего из перечисленного в routes, загрузим главную страницу нашего SPA
            window.location.href = '#/';
            return; // обязательно нужно завершить эту функцию, чтобы дальше ничего за ней не происходило.
        }

            document.getElementById('content').innerHTML = await fetch(newRoute.template)
    }
}