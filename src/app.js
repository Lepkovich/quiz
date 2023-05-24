import {Router} from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
}

(new App()); // при загрузке index.html мы перейдем в App.js и сразу чтобы класс App сработал, создаем здесь новый экземпляр
// в скобки обернули для красоты