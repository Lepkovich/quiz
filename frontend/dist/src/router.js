"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var form_1 = require("./components/form");
var choice_1 = require("./components/choice");
var test_1 = require("./components/test");
var result_1 = require("./components/result");
var answers_1 = require("./components/answers");
var auth_1 = require("./services/auth");
var Router = /** @class */ (function () {
    function Router() {
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
                    load: function () {
                    }
                },
                {
                    route: '#/signup',
                    title: 'Регистрация',
                    template: 'templates/signup.html',
                    styles: 'styles/form.css',
                    load: function () {
                        new form_1.Form('signup');
                    }
                },
                {
                    route: '#/login',
                    title: 'Вход в систему ',
                    template: 'templates/login.html',
                    styles: 'styles/form.css',
                    load: function () {
                        new form_1.Form('login');
                    }
                },
                {
                    route: '#/choice',
                    title: 'Выбор теста',
                    template: 'templates/choice.html',
                    styles: 'styles/choice.css',
                    load: function () {
                        new choice_1.Choice();
                    }
                },
                {
                    route: '#/test',
                    title: 'Прохождение теста',
                    template: 'templates/test.html',
                    styles: 'styles/test.css',
                    load: function () {
                        new test_1.Test();
                    }
                },
                {
                    route: '#/result',
                    title: 'Результат',
                    template: 'templates/result.html',
                    styles: 'styles/result.css',
                    load: function () {
                        new result_1.Result();
                    }
                },
                {
                    route: '#/answers',
                    title: 'Ответы на тест',
                    template: 'templates/answers.html',
                    styles: 'styles/answers.css',
                    load: function () {
                        new answers_1.Answers();
                    }
                },
            ];
    }
    Router.prototype.openRoute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var urlRoute, result, newRoute, _a, userInfo, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlRoute = window.location.hash.split('?')[0];
                        if (!(urlRoute === '#/logout')) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth_1.Auth.logOut()];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            window.location.href = '#/';
                            return [2 /*return*/];
                        }
                        else {
                            //...
                        }
                        _b.label = 2;
                    case 2:
                        newRoute = this.routes.find(function (item) {
                            return item.route === urlRoute;
                        });
                        if (!newRoute) { // если мы не найдем в адресной строке ничего из перечисленного в routes, загрузим главную страницу нашего SPA
                            window.location.href = '#/';
                            return [2 /*return*/]; // обязательно нужно завершить эту функцию, чтобы дальше ничего за ней не происходило.
                        }
                        if (!this.contentElement || !this.stylesElement || !this.titleElement || !this.profileElement || !this.profileFullNameElement) {
                            if (urlRoute === '#/') {
                                return [2 /*return*/];
                            }
                            else {
                                window.location.href = '#/';
                                return [2 /*return*/];
                            }
                        }
                        _a = this.contentElement;
                        return [4 /*yield*/, fetch(newRoute.template).then(function (response) { return response.text(); })];
                    case 3:
                        _a.innerHTML = _b.sent();
                        this.stylesElement.setAttribute('href', newRoute.styles);
                        this.titleElement.innerText = newRoute.title;
                        userInfo = auth_1.Auth.getUserInfo();
                        accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (userInfo && accessToken) { //если да
                            this.profileElement.style.display = 'flex'; //отображаем блок пользователя
                            this.profileFullNameElement.innerText = userInfo.fullName; //пишем имя пользователя
                        }
                        else {
                            this.profileElement.style.display = 'none'; //скрываем блок пользователя
                        }
                        newRoute.load();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map