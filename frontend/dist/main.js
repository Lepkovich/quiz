/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    host: 'http://localhost:3000/api'
};


/***/ }),

/***/ "./src/components/answers.ts":
/*!***********************************!*\
  !*** ./src/components/answers.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Answers = void 0;
var url_manager_ts_1 = __webpack_require__(/*! ../utils/url-manager.ts */ "./src/utils/url-manager.ts");
var auth_ts_1 = __webpack_require__(/*! ../services/auth.ts */ "./src/services/auth.ts");
var custom_http_ts_1 = __webpack_require__(/*! ../services/custom-http.ts */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Answers = /** @class */ (function () {
    function Answers() {
        this.quiz = null;
        this.routeParams = url_manager_ts_1.UrlManager.getQueryParams();
        this.userData = null;
        this.init();
    }
    Answers.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, userEmail, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_ts_1.Auth.getUserInfo();
                        userEmail = auth_ts_1.Auth.getUserEmail();
                        if (!userInfo || !userEmail) {
                            location.href = '#/';
                        }
                        this.userData = userInfo.fullName + ', ' + userEmail;
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_ts_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId)];
                    case 2:
                        result = _a.sent();
                        // /api/tests/:id/result/details?userId=:userId
                        if (result) {
                            if (result.error) {
                                throw new Error(result.error);
                            }
                            this.quiz = result;
                            this.showQuestions();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Answers.prototype.showQuestions = function () {
        document.getElementById('pre-title').innerText = this.quiz.test.name;
        document.getElementById('user').querySelector('span').textContent = this.userData;
        var answersBlock = document.getElementById('answers-block');
        //создаем структуру html
        for (var i = 0; i < this.quiz.test.questions.length; i++) {
            // Создаем div-элемент с class="test-answers-block-title" и id="title"
            var div = document.createElement("div");
            div.classList.add("test-answers-block-title");
            div.id = "question";
            div.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + this.quiz.test.questions[i].question;
            // Добавляем созданный div-элемент в answersBlock
            answersBlock.appendChild(div);
            this.quiz.test.questions[i].answers.forEach(function (item) {
                // создаем div-элемент с class="test-answers-block-options" и id="options"
                var div = document.createElement("div");
                div.classList.add("test-answers-block-options");
                div.id = "options";
                // создаем вариант ответа
                var option1 = document.createElement("div");
                option1.classList.add("test-answers-block-option");
                // создаем кружок перед ответом
                var circle = document.createElement("div");
                circle.classList.add("test-answers-block-option-circle");
                if (item.correct === true) {
                    circle.classList.add("correct-answer-circle");
                }
                else if (item.correct === false) {
                    circle.classList.add("wrong-answer-circle");
                }
                option1.appendChild(circle);
                // создаем текст для варианта ответа
                var optionText = document.createElement("div");
                optionText.classList.add("test-answers-block-option-text");
                if (item.correct === true) {
                    optionText.classList.add("correct-answer-text");
                }
                else if (item.correct === false) {
                    optionText.classList.add("wrong-answer-text");
                }
                optionText.innerText = item.answer;
                option1.appendChild(optionText);
                // добавляем вариант ответа в div-элемент
                div.appendChild(option1);
                // добавляем div-элемент в answersBlock
                answersBlock.appendChild(div);
            });
        }
        var backToResult = document.getElementById('back-to-results');
        backToResult.onclick = function () {
            window.history.back();
        };
    };
    return Answers;
}());
exports.Answers = Answers;


/***/ }),

/***/ "./src/components/choice.ts":
/*!**********************************!*\
  !*** ./src/components/choice.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Choice = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Choice = /** @class */ (function () {
    function Choice() {
        this.quizzes = [];
        this.testResult = null;
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Choice.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1, userInfo, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests ')];
                    case 1:
                        _a.quizzes = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/];
                    case 3:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) return [3 /*break*/, 7];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/results?userId=' + userInfo.userId)];
                    case 5:
                        result = _b.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.testResult = result;
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/];
                    case 7:
                        this.processQuizzes();
                        return [2 /*return*/];
                }
            });
        });
    };
    Choice.prototype.processQuizzes = function () {
        var _this = this;
        var choiceOptionsElement = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0 && choiceOptionsElement) {
            this.quizzes.forEach(function (quiz) {
                var that = _this;
                var choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice-option';
                choiceOptionElement.setAttribute('data-id', quiz.id.toString());
                // choiceOptionElement.onclick = () => {
                //     this.chooseQuiz(choiceOptionElement); // Передаем choiceOptionElement напрямую, вместо использования 'this' по совету chatGPT
                // };
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this); //утверждение типа (мы уверены, что там HTML)
                };
                var choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice-option-text';
                choiceOptionTextElement.innerText = quiz.name;
                var choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice-option-arrow';
                if (_this.testResult) { // у Романа в уроке нет проблем с find (по таймингу проходим его до отметки в 1ч
                    var result = _this.testResult.find(function (item) { return item.testId === quiz.id; });
                    if (result) {
                        var choiceOptionResultElement = document.createElement('div');
                        choiceOptionResultElement.className = 'choice-option-result';
                        choiceOptionResultElement.innerHTML = '<div>Результат</div> <div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement);
                    }
                }
                var choiceOptionImageElement = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', '/images/arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'стрелка');
                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);
            });
        }
    };
    Choice.prototype.chooseQuiz = function (element) {
        var dataID = element.getAttribute('data-id');
        if (dataID) {
            location.href = '#/test?id=' + dataID;
        }
    };
    return Choice;
}());
exports.Choice = Choice;


/***/ }),

/***/ "./src/components/form.ts":
/*!********************************!*\
  !*** ./src/components/form.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Form = /** @class */ (function () {
    function Form(page) {
        this.fields = [];
        this.agreeElement = null;
        this.processElement = null;
        this.page = page;
        var accessToken = localStorage.getItem(auth_1.Auth.accessTokenKey); //проверяем есть ли в localStorage accessTokenKey
        if (accessToken) {
            location.href = '#/choice';
            return;
        }
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                /* (?=.*\d)          // should contain at least one digit
                (?=.*[a-z])       // should contain at least one lower case
                (?=.*[A-Z])       // should contain at least one upper case
                [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters  */
                valid: false,
            },
        ];
        if (this.page === 'signup') { //если мы на signup, то нужны поля name и lastName
            this.fields.unshift({
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            }, {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            });
        }
        var that = this;
        this.fields.forEach(function (item) {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            }
        });
        this.processElement = document.getElementById('process');
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm();
            };
        }
        if (this.page === 'signup') {
            this.agreeElement = document.getElementById('agree');
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm();
                };
            }
        }
    }
    Form.prototype.validateField = function (field, element) {
        if (element.parentNode) {
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = 'red'; //красим рамку родителю
                field.valid = false;
            }
            else {
                element.parentNode.removeAttribute('style'); // удалим покраску родительской рамки
                field.valid = true;
            }
        }
        this.validateForm();
    };
    Form.prototype.validateForm = function () {
        var validForm = this.fields.every(function (item) { return item.valid; });
        var isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        // если this.agreeElement true, то проверяем checked && validForm, иначе только validForm
        if (this.processElement) {
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            }
            else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
        }
        return isValid;
    };
    Form.prototype.processForm = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var email, password, result, error_1, result, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!this.validateForm()) return [3 /*break*/, 7];
                        email = (_b = (_a = this.fields.find(function (item) { return item.name === 'email'; })) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.value;
                        password = (_d = (_c = this.fields.find(function (item) { return item.name === 'password'; })) === null || _c === void 0 ? void 0 : _c.element) === null || _d === void 0 ? void 0 : _d.value;
                        if (!(this.page === 'signup')) return [3 /*break*/, 4];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/signup', "POST", {
                                name: (_f = (_e = this.fields.find(function (item) { return item.name === 'name'; })) === null || _e === void 0 ? void 0 : _e.element) === null || _f === void 0 ? void 0 : _f.value,
                                lastName: (_h = (_g = this.fields.find(function (item) { return item.name === 'lastName'; })) === null || _g === void 0 ? void 0 : _g.element) === null || _h === void 0 ? void 0 : _h.value,
                                email: email,
                                password: password,
                            })];
                    case 2:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        console.log(error_1); // нужно выйти из функции, если ошибка при регистрации
                        return [2 /*return*/];
                    case 4:
                        _j.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/login', "POST", {
                                email: email,
                                password: password,
                            })];
                    case 5:
                        result = _j.sent();
                        if (result) {
                            if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                                throw new Error(result.message);
                            }
                            auth_1.Auth.setTokens(result.accessToken, result.refreshToken);
                            auth_1.Auth.setUserInfo({
                                fullName: result.fullName,
                                userId: result.userId
                            });
                            auth_1.Auth.setUserEmail(result.email);
                            location.href = '#/choice'; //переводим пользователя на новую страницу
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _j.sent();
                        console.log(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;


/***/ }),

/***/ "./src/components/result.ts":
/*!**********************************!*\
  !*** ./src/components/result.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var Result = /** @class */ (function () {
    function Result() {
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        // UrlManager.checkResultData(this.routeParams);
        // document.getElementById('result-score').innerText = this.routeParams.score + '/' + this.routeParams.total;
        var id = this.routeParams.id;
        var next = document.getElementById('show-answers');
        next.onclick = function () {
            location.href = '#/answers?id=' + id;
        };
        this.init();
    }
    Result.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, resultScoreElement, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            resultScoreElement = document.getElementById('result-score');
                            if (resultScoreElement) {
                                resultScoreElement.innerText = result.score + '/' + result.total;
                            }
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        location.href = '#/';
                        return [2 /*return*/];
                }
            });
        });
    };
    return Result;
}());
exports.Result = Result;


/***/ }),

/***/ "./src/components/test.ts":
/*!********************************!*\
  !*** ./src/components/test.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Test = void 0;
var url_manager_1 = __webpack_require__(/*! ../utils/url-manager */ "./src/utils/url-manager.ts");
var custom_http_1 = __webpack_require__(/*! ../services/custom-http */ "./src/services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../services/auth */ "./src/services/auth.ts");
var action_test_type_1 = __webpack_require__(/*! ../types/action-test.type */ "./src/types/action-test.type.ts");
var Test = /** @class */ (function () {
    function Test() {
        this.interval = 0;
        this.quiz = null;
        this.progressBarElement = null;
        this.questionTitleElement = null;
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.optionsElement = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.routeParams = url_manager_1.UrlManager.getQueryParams();
        this.init();
    }
    Test.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.routeParams.id) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            this.quiz = result;
                            this.startQuiz();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Test.prototype.startQuiz = function () {
        if (!this.quiz)
            return;
        this.progressBarElement = document.getElementById('progress-bar');
        this.questionTitleElement = document.getElementById('question-title');
        this.optionsElement = document.getElementById('options');
        this.nextButtonElement = document.getElementById('next');
        if (this.nextButtonElement) {
            this.nextButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.next);
        }
        this.passButtonElement = document.getElementById('pass');
        if (this.passButtonElement) {
            this.passButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.pass);
        }
        this.prevButtonElement = document.getElementById('prev');
        if (this.prevButtonElement) {
            this.prevButtonElement.onclick = this.move.bind(this, action_test_type_1.ActionTestType.prev);
        }
        var preTitleElement = document.getElementById('pre-title');
        if (preTitleElement) {
            preTitleElement.innerText = this.quiz.name;
        }
        this.prepareProgressBar();
        this.showQuestion();
        var timerElement = document.getElementById('timer');
        var seconds = 59;
        var that = this;
        this.interval = window.setInterval(function () {
            seconds--;
            if (timerElement) {
                timerElement.innerText = seconds.toString();
            }
            if (seconds === 0) {
                clearInterval(that.interval);
                that.complete();
            }
        }.bind(this), 1000);
    };
    Test.prototype.prepareProgressBar = function () {
        if (!this.quiz)
            return;
        // создаем структуру html документа "test-progress-bar"
        for (var i = 0; i < this.quiz.questions.length; i++) {
            var itemElement = document.createElement('div');
            itemElement.className = 'test-progress-bar-item' + (i === 0 ? ' active' : '');
            var itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test-progress-bar-item-circle';
            var itemTextElement = document.createElement('div');
            itemTextElement.className = 'test-progress-bar-item-text';
            itemTextElement.innerText = 'Вопрос ' + (i + 1);
            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);
            if (this.progressBarElement) {
                this.progressBarElement.appendChild(itemElement);
            }
        }
    };
    Test.prototype.showQuestion = function () {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        if (this.questionTitleElement) {
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
                + ':</span> ' + activeQuestion.question;
        }
        if (this.optionsElement) {
            this.optionsElement.innerHTML = ''; //удалим текущие ответы
        }
        var that = this;
        var chosenOption = this.userResult.find(function (item) { return item.questionId === activeQuestion.id; }); //чтобы отрисовать сделанный ранее пользователем выбор radio, ищем есть в массиве этот выбор
        //и размещаем структуру html с вариантами ответов
        activeQuestion.answers.forEach(function (answer) {
            //создаем строку <div class="test-question-option">
            var optionElement = document.createElement('div');
            optionElement.className = 'test-question-option';
            //создаем строку <input type="radio" id="answer-one" name="answer">
            var inputId = 'answer-' + answer.id;
            var inputElement = document.createElement('input');
            inputElement.className = 'option-answer';
            inputElement.setAttribute('id', inputId);
            inputElement.setAttribute('type', 'radio');
            inputElement.setAttribute('name', 'answer');
            inputElement.setAttribute('value', answer.id.toString());
            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute('checked', 'checked');
            }
            inputElement.onchange = function () {
                that.chooseAnswer();
            };
            //создаем строку <label for="answer-one">Вариант ответа 1 </label>
            var labelElement = document.createElement('label');
            labelElement.setAttribute('for', inputId);
            labelElement.innerText = answer.answer;
            //создаем нужную нам вложенность элементов по примеру из test.html:
            /* <div className="test-question-options" id="options">
                 <div className="test-question-option">
                     <input type="radio" id="answer-one" name="answer">
                     <label htmlFor="answer-one">Вариант ответа 1 </label>
                 </div>
             </div> */
            optionElement.appendChild(inputElement);
            optionElement.appendChild(labelElement);
            if (_this.optionsElement) {
                _this.optionsElement.appendChild(optionElement);
            }
        });
        if (this.nextButtonElement) {
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute('disabled');
            }
            else {
                this.nextButtonElement.setAttribute('disabled', 'disabled');
            }
        }
        if (this.nextButtonElement) {
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить';
            }
            else {
                this.nextButtonElement.innerText = 'Далее';
            }
        }
        if (this.prevButtonElement) {
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            }
            else {
                this.prevButtonElement.setAttribute('disabled', 'disabled');
            }
        }
    };
    Test.prototype.chooseAnswer = function () {
        if (this.nextButtonElement) {
            this.nextButtonElement.removeAttribute('disabled');
        }
    };
    Test.prototype.move = function (action) {
        var _this = this;
        if (!this.quiz)
            return;
        var activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        var chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(function (element) {
            return element.checked;
        });
        var chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }
        var existingResult = this.userResult.find(function (item) {
            return item.questionId === activeQuestion.id;
        });
        if (chosenAnswerId) {
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            }
            else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                });
            }
        }
        if (action === action_test_type_1.ActionTestType.next || action === action_test_type_1.ActionTestType.pass) {
            this.currentQuestionIndex++;
        }
        else {
            this.currentQuestionIndex--;
        }
        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }
        if (this.progressBarElement) {
            Array.from(this.progressBarElement.children).forEach(function (item, index) {
                var currentItemIndex = index + 1;
                item.classList.remove('complete');
                item.classList.remove('active');
                if (currentItemIndex === _this.currentQuestionIndex) {
                    item.classList.add('active');
                }
                else if (currentItemIndex < _this.currentQuestionIndex) {
                    item.classList.add('complete');
                }
            });
        }
        this.showQuestion();
    };
    Test.prototype.complete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInfo = auth_1.Auth.getUserInfo();
                        if (!userInfo) {
                            location.href = '#/';
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request(config_1.default.host + '/tests/' + this.routeParams.id + '/pass', 'POST', {
                                userId: userInfo.userId,
                                results: this.userResult
                            })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error !== undefined) {
                                throw new Error(result.message);
                            }
                            location.href = '#/result?id=' + this.routeParams.id;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Test;
}());
exports.Test = Test;


/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
var form_1 = __webpack_require__(/*! ./components/form */ "./src/components/form.ts");
var choice_1 = __webpack_require__(/*! ./components/choice */ "./src/components/choice.ts");
var test_1 = __webpack_require__(/*! ./components/test */ "./src/components/test.ts");
var result_1 = __webpack_require__(/*! ./components/result */ "./src/components/result.ts");
var answers_1 = __webpack_require__(/*! ./components/answers */ "./src/components/answers.ts");
var auth_1 = __webpack_require__(/*! ./services/auth */ "./src/services/auth.ts");
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


/***/ }),

/***/ "./src/services/auth.ts":
/*!******************************!*\
  !*** ./src/services/auth.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Auth = exports.Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.processUnauthorizedResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + '/refresh', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error && result.accessToken && result.refreshToken) {
                            this.setTokens(result.accessToken, result.refreshToken);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3:
                        this.removeTokens(); //если запрос с ошибкой, удалим токены
                        location.href = '#/'; //и отправлять на главную
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.logOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(config_1.default.host + '/logout', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error) {
                            Auth.removeTokens();
                            localStorage.removeItem(this.userInfoKey);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.setTokens = function (accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    };
    Auth.removeTokens = function () {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    };
    Auth.setUserInfo = function (info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info)); //хранить объект в localStorage нельзя, поэтому преобразуем пользователя в строку
    };
    Auth.getUserInfo = function () {
        var userInfo = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    };
    Auth.setUserEmail = function (email) {
        if (email) {
            localStorage.setItem(this.userEmail, email);
        }
        else {
            localStorage.setItem(this.userEmail, 'none'); //если email не пришел, запишем в localStorage 'none'
        }
    };
    Auth.getUserEmail = function () {
        var userEmail = localStorage.getItem(this.userEmail);
        if (userEmail) {
            return userEmail;
        }
        return null;
    };
    Auth.accessTokenKey = 'accessToken';
    Auth.refreshTokenKey = 'refreshToken';
    Auth.userInfoKey = 'userInfo';
    Auth.userEmail = 'userEmail';
    return Auth;
}());


/***/ }),

/***/ "./src/services/custom-http.ts":
/*!*************************************!*\
  !*** ./src/services/custom-http.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


//сервис для создания http-запроса на сервер (backend)
// принимаем 3 параметра: url, method (по умолчанию GET) и body (по умолчанию null)
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomHttp = void 0;
var auth_1 = __webpack_require__(/*! ./auth */ "./src/services/auth.ts");
var CustomHttp = /** @class */ (function () {
    function CustomHttp() {
    }
    CustomHttp.request = function (url, method, body) {
        if (method === void 0) { method = "GET"; }
        if (body === void 0) { body = null; }
        return __awaiter(this, void 0, void 0, function () {
            var params, token, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            method: method,
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            },
                        };
                        token = localStorage.getItem(auth_1.Auth.accessTokenKey);
                        if (token) {
                            params.headers['x-access-token'] = token;
                        }
                        if (body) { //если POST запрос и в нем есть body
                            params.body = JSON.stringify(body);
                        }
                        return [4 /*yield*/, fetch(url, params)];
                    case 1:
                        response = _a.sent();
                        if (!(response.status < 200 || response.status >= 300)) return [3 /*break*/, 6];
                        if (!(response.status === 401)) return [3 /*break*/, 5];
                        return [4 /*yield*/, auth_1.Auth.processUnauthorizedResponse()];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.request(url, method, body)];
                    case 3: return [2 /*return*/, _a.sent()]; //рекурсия. чтобы понять, пройтись дебагом
                    case 4: return [2 /*return*/, null];
                    case 5: throw new Error(response.statusText);
                    case 6: return [4 /*yield*/, response.json()];
                    case 7: return [2 /*return*/, _a.sent()]; //возвращаем ответ сервера
                }
            });
        });
    };
    return CustomHttp;
}());
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "./src/types/action-test.type.ts":
/*!***************************************!*\
  !*** ./src/types/action-test.type.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionTestType = void 0;
var ActionTestType;
(function (ActionTestType) {
    ActionTestType["next"] = "next";
    ActionTestType["pass"] = "pass";
    ActionTestType["prev"] = "prev";
})(ActionTestType || (exports.ActionTestType = ActionTestType = {}));


/***/ }),

/***/ "./src/utils/url-manager.ts":
/*!**********************************!*\
  !*** ./src/utils/url-manager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UrlManager = void 0;
var UrlManager = /** @class */ (function () {
    function UrlManager() {
    }
    UrlManager.getQueryParams = function () {
        var qs = document.location.hash.split('+').join(' ');
        var params = {}, tokens, re = /[?&]([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    };
    return UrlManager;
}());
exports.UrlManager = UrlManager;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var router_1 = __webpack_require__(/*! ./router */ "./src/router.ts");
var App = /** @class */ (function () {
    function App() {
        this.router = new router_1.Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }
    App.prototype.handleRouteChanging = function () {
        this.router.openRoute();
    };
    return App;
}());
(new App()); // при загрузке index.html мы перейдем в App.js и сразу чтобы класс App сработал, создаем здесь новый экземпляр
// в скобки обернули для красоты

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7QUFkWSxnQ0FBVTs7Ozs7OztVQ0Z2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsc0VBQWdDO0FBRWhDO0lBRUk7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8saUNBQW1CLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUM7QUFFRCxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLCtHQUErRztBQUM1SCxnQ0FBZ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWl6Ly4vY29uZmlnL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL2NvbXBvbmVudHMvYW5zd2Vycy50cyIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL2NvbXBvbmVudHMvY2hvaWNlLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvY29tcG9uZW50cy9mb3JtLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvY29tcG9uZW50cy9yZXN1bHQudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9jb21wb25lbnRzL3Rlc3QudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy9zZXJ2aWNlcy9hdXRoLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvc2VydmljZXMvY3VzdG9tLWh0dHAudHMiLCJ3ZWJwYWNrOi8vcXVpei8uL3NyYy90eXBlcy9hY3Rpb24tdGVzdC50eXBlLnRzIiwid2VicGFjazovL3F1aXovLi9zcmMvdXRpbHMvdXJsLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcXVpei93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9xdWl6Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBob3N0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaSdcclxufSIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxzL3VybC1tYW5hZ2VyLnRzXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGgudHNcIjtcclxuaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vc2VydmljZXMvY3VzdG9tLWh0dHAudHNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuc3dlcnMge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucXVpeiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yb3V0ZVBhcmFtcyA9IFVybE1hbmFnZXIuZ2V0UXVlcnlQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLnVzZXJEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBhc3luYyBpbml0KCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvID0gQXV0aC5nZXRVc2VySW5mbygpOyAvL9Cx0LXRgNC10Lwg0LjQtyBsb2NhbFN0b3JhZ2Ug0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C1XHJcbiAgICAgICAgY29uc3QgdXNlckVtYWlsID0gQXV0aC5nZXRVc2VyRW1haWwoKTsgLy/QsdC10YDQtdC8INC40LcgbG9jYWxTdG9yYWdlIGVtYWlsXHJcbiAgICAgICAgaWYoIXVzZXJJbmZvIHx8ICF1c2VyRW1haWwpe1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51c2VyRGF0YSA9IHVzZXJJbmZvLmZ1bGxOYW1lICsgJywgJyArIHVzZXJFbWFpbDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yb3V0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cy8nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZCArICcvcmVzdWx0L2RldGFpbHM/dXNlcklkPScgKyB1c2VySW5mby51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gL2FwaS90ZXN0cy86aWQvcmVzdWx0L2RldGFpbHM/dXNlcklkPTp1c2VySWRcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVpeiA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dRdWVzdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dRdWVzdGlvbnMoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZS10aXRsZScpLmlubmVyVGV4dCA9IHRoaXMucXVpei50ZXN0Lm5hbWU7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXInKS5xdWVyeVNlbGVjdG9yKCdzcGFuJykudGV4dENvbnRlbnQgPSB0aGlzLnVzZXJEYXRhO1xyXG5cclxuICAgICAgICBjb25zdCBhbnN3ZXJzQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5zd2Vycy1ibG9jaycpXHJcblxyXG4vL9GB0L7Qt9C00LDQtdC8INGB0YLRgNGD0LrRgtGD0YDRgyBodG1sXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnF1aXoudGVzdC5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbi8vINCh0L7Qt9C00LDQtdC8IGRpdi3RjdC70LXQvNC10L3RgiDRgSBjbGFzcz1cInRlc3QtYW5zd2Vycy1ibG9jay10aXRsZVwiINC4IGlkPVwidGl0bGVcIlxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInRlc3QtYW5zd2Vycy1ibG9jay10aXRsZVwiKTtcclxuICAgICAgICAgICAgZGl2LmlkID0gXCJxdWVzdGlvblwiO1xyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzxzcGFuPtCS0L7Qv9GA0L7RgSAnICsgKGkgKyAxKSArICc6PC9zcGFuPiAnICsgdGhpcy5xdWl6LnRlc3QucXVlc3Rpb25zW2ldLnF1ZXN0aW9uO1xyXG5cclxuLy8g0JTQvtCx0LDQstC70Y/QtdC8INGB0L7Qt9C00LDQvdC90YvQuSBkaXYt0Y3Qu9C10LzQtdC90YIg0LIgYW5zd2Vyc0Jsb2NrXHJcbiAgICAgICAgICAgIGFuc3dlcnNCbG9jay5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5xdWl6LnRlc3QucXVlc3Rpb25zW2ldLmFuc3dlcnMuZm9yRWFjaChpdGVtID0+IHtcclxuLy8g0YHQvtC30LTQsNC10LwgZGl2LdGN0LvQtdC80LXQvdGCINGBIGNsYXNzPVwidGVzdC1hbnN3ZXJzLWJsb2NrLW9wdGlvbnNcIiDQuCBpZD1cIm9wdGlvbnNcIlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidGVzdC1hbnN3ZXJzLWJsb2NrLW9wdGlvbnNcIik7XHJcbiAgICAgICAgICAgICAgICBkaXYuaWQgPSBcIm9wdGlvbnNcIjtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INCy0LDRgNC40LDQvdGCINC+0YLQstC10YLQsFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24xLmNsYXNzTGlzdC5hZGQoXCJ0ZXN0LWFuc3dlcnMtYmxvY2stb3B0aW9uXCIpO1xyXG5cclxuLy8g0YHQvtC30LTQsNC10Lwg0LrRgNGD0LbQvtC6INC/0LXRgNC10LQg0L7RgtCy0LXRgtC+0LxcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgY2lyY2xlLmNsYXNzTGlzdC5hZGQoXCJ0ZXN0LWFuc3dlcnMtYmxvY2stb3B0aW9uLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvcnJlY3QgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGUuY2xhc3NMaXN0LmFkZChcImNvcnJlY3QtYW5zd2VyLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5jb3JyZWN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZS5jbGFzc0xpc3QuYWRkKFwid3JvbmctYW5zd2VyLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbjEuYXBwZW5kQ2hpbGQoY2lyY2xlKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INGC0LXQutGB0YIg0LTQu9GPINCy0LDRgNC40LDQvdGC0LAg0L7RgtCy0LXRgtCwXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvblRleHQuY2xhc3NMaXN0LmFkZChcInRlc3QtYW5zd2Vycy1ibG9jay1vcHRpb24tdGV4dFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvcnJlY3QgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25UZXh0LmNsYXNzTGlzdC5hZGQoXCJjb3JyZWN0LWFuc3dlci10ZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmNvcnJlY3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uVGV4dC5jbGFzc0xpc3QuYWRkKFwid3JvbmctYW5zd2VyLXRleHRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25UZXh0LmlubmVyVGV4dCA9IGl0ZW0uYW5zd2VyO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMS5hcHBlbmRDaGlsZChvcHRpb25UZXh0KTtcclxuXHJcbi8vINC00L7QsdCw0LLQu9GP0LXQvCDQstCw0YDQuNCw0L3RgiDQvtGC0LLQtdGC0LAg0LIgZGl2LdGN0LvQtdC80LXQvdGCXHJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQob3B0aW9uMSk7XHJcbi8vINC00L7QsdCw0LLQu9GP0LXQvCBkaXYt0Y3Qu9C10LzQtdC90YIg0LIgYW5zd2Vyc0Jsb2NrXHJcbiAgICAgICAgICAgICAgICBhbnN3ZXJzQmxvY2suYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBiYWNrVG9SZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay10by1yZXN1bHRzJyk7XHJcbiAgICAgICAgYmFja1RvUmVzdWx0Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtVcmxNYW5hZ2VyfSBmcm9tIFwiLi4vdXRpbHMvdXJsLW1hbmFnZXJcIjtcclxuaW1wb3J0IHtDdXN0b21IdHRwfSBmcm9tIFwiLi4vc2VydmljZXMvY3VzdG9tLWh0dHBcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoXCI7XHJcbmltcG9ydCB7UXVlcnlQYXJhbXNUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcXVlcnktcGFyYW1zLnR5cGVcIjtcclxuaW1wb3J0IHtRdWl6TGlzdFR5cGV9IGZyb20gXCIuLi90eXBlcy9xdWl6LWxpc3QudHlwZVwiO1xyXG5pbXBvcnQge1Rlc3RSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdGVzdC1yZXN1bHQudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJJbmZvVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcbmltcG9ydCB7RGVmYXVsdFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2RlZmF1bHQtcmVzcG9uc2UudHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENob2ljZSB7XHJcbiAgICBwcml2YXRlIHF1aXp6ZXM6IFF1aXpMaXN0VHlwZVtdID0gW107XHJcbiAgICBwcml2YXRlIHRlc3RSZXN1bHQ6IFRlc3RSZXN1bHRUeXBlW10gfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgcm91dGVQYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVQYXJhbXMgPSBVcmxNYW5hZ2VyLmdldFF1ZXJ5UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnF1aXp6ZXMgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzICcpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpOyAvL9Cx0LXRgNC10Lwg0LjQtyBsb2NhbFN0b3JhZ2Ug0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C1XHJcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBUZXN0UmVzdWx0VHlwZVtdID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cy9yZXN1bHRzP3VzZXJJZD0nICsgdXNlckluZm8udXNlcklkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkuZXJyb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0ID0gcmVzdWx0IGFzIFRlc3RSZXN1bHRUeXBlW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzUXVpenplcygpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc1F1aXp6ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaG9pY2Utb3B0aW9ucycpO1xyXG4gICAgICAgIGlmICh0aGlzLnF1aXp6ZXMgJiYgdGhpcy5xdWl6emVzLmxlbmd0aCA+IDAgJiYgY2hvaWNlT3B0aW9uc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWl6emVzLmZvckVhY2goKHF1aXo6UXVpekxpc3RUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGF0OiBDaG9pY2UgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlT3B0aW9uRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICdjaG9pY2Utb3B0aW9uJztcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgcXVpei5pZC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgLy8gY2hvaWNlT3B0aW9uRWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuY2hvb3NlUXVpeihjaG9pY2VPcHRpb25FbGVtZW50KTsgLy8g0J/QtdGA0LXQtNCw0LXQvCBjaG9pY2VPcHRpb25FbGVtZW50INC90LDQv9GA0Y/QvNGD0Y4sINCy0LzQtdGB0YLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyAndGhpcycg0L/QviDRgdC+0LLQtdGC0YMgY2hhdEdQVFxyXG4gICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNob29zZVF1aXooPEhUTUxFbGVtZW50PnRoaXMpOyAvL9GD0YLQstC10YDQttC00LXQvdC40LUg0YLQuNC/0LAgKNC80Ysg0YPQstC10YDQtdC90YssINGH0YLQviDRgtCw0LwgSFRNTClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25UZXh0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25UZXh0RWxlbWVudC5jbGFzc05hbWUgPSAnY2hvaWNlLW9wdGlvbi10ZXh0JztcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvblRleHRFbGVtZW50LmlubmVyVGV4dCA9IHF1aXoubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uQXJyb3dFbGVtZW50LmNsYXNzTmFtZSA9ICdjaG9pY2Utb3B0aW9uLWFycm93JztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0UmVzdWx0KSB7IC8vINGDINCg0L7QvNCw0L3QsCDQsiDRg9GA0L7QutC1INC90LXRgiDQv9GA0L7QsdC70LXQvCDRgSBmaW5kICjQv9C+INGC0LDQudC80LjQvdCz0YMg0L/RgNC+0YXQvtC00LjQvCDQtdCz0L4g0LTQviDQvtGC0LzQtdGC0LrQuCDQsiAx0YdcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IFRlc3RSZXN1bHRUeXBlIHwgdW5kZWZpbmVkID0gdGhpcy50ZXN0UmVzdWx0LmZpbmQoaXRlbSA9PiBpdGVtLnRlc3RJZCA9PT0gcXVpei5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uUmVzdWx0RWxlbWVudC5jbGFzc05hbWUgPSAnY2hvaWNlLW9wdGlvbi1yZXN1bHQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2PtCg0LXQt9GD0LvRjNGC0LDRgjwvZGl2PiA8ZGl2PicgKyByZXN1bHQuc2NvcmUgKyAnLycgKyByZXN1bHQudG90YWwgKyAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25SZXN1bHRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uSW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWFnZXMvYXJyb3cucG5nJyk7XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25JbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhbHQnLCAn0YHRgtGA0LXQu9C60LAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uSW1hZ2VFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hvaWNlT3B0aW9uVGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY2hvaWNlT3B0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VPcHRpb25BcnJvd0VsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNob2ljZU9wdGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZU9wdGlvbkVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNob29zZVF1aXooZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhSUQ6IHN0cmluZyB8IG51bGwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXHJcbiAgICAgICAgaWYgKGRhdGFJRCkge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvdGVzdD9pZD0nICsgZGF0YUlEO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7Rm9ybUZpZWxkVHlwZX0gZnJvbSBcIi4uL3R5cGVzL2Zvcm0tZmllbGQudHlwZVwiO1xyXG5pbXBvcnQge1NpZ251cFJlc3BvbnNlVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3NpZ251cC1yZXNwb25zZS50eXBlXCI7XHJcbmltcG9ydCB7TG9naW5SZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9sb2dpbi1yZXNwb25zZS50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybSB7XHJcbiAgICByZWFkb25seSBhZ3JlZUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgcHJvY2Vzc0VsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHJlYWRvbmx5IHBhZ2U6ICdzaWdudXAnIHwgJ2xvZ2luJztcclxuICAgIHByaXZhdGUgZmllbGRzOiBGb3JtRmllbGRUeXBlW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYWdlOiAnc2lnbnVwJyB8ICdsb2dpbicpIHtcclxuICAgICAgICB0aGlzLmFncmVlRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEF1dGguYWNjZXNzVG9rZW5LZXkpOyAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQtdGB0YLRjCDQu9C4INCyIGxvY2FsU3RvcmFnZSBhY2Nlc3NUb2tlbktleVxyXG4gICAgICAgIGlmIChhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvY2hvaWNlJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maWVsZHMgPSBbICAvL9C00LLQsCDQv9C+0LvRjyDRgyDQvdCw0YEg0LHRg9C00YPRgiDQvdCwINC+0LHQvtC40YUg0YHRgtGA0LDQvdC40YbQsNGFXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdlbWFpbCcsXHJcbiAgICAgICAgICAgICAgICBpZDogJ2VtYWlsJyxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZWdleDogL14oW0EtWmEtejAtOV9cXC1cXC5dKStcXEAoW0EtWmEtejAtOV9cXC1cXC5dKStcXC4oW0EtWmEtel17Miw0fSkkLywgLy/RgNC10LPRg9C70Y/RgNC60LAg0LTQu9GPINC/0YDQvtCy0LXRgNC60LggZW1haWxcclxuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgICAgICAgICAgIGlkOiAncGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXig/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSlbMC05YS16QS1aXXs4LH0kLywgLy/RgNC10LPRg9C70Y/RgNC60LAg0LTQu9GPINC/0LDRgNC+0LvRj1xyXG4gICAgICAgICAgICAgICAgLyogKD89LipcXGQpICAgICAgICAgIC8vIHNob3VsZCBjb250YWluIGF0IGxlYXN0IG9uZSBkaWdpdFxyXG4gICAgICAgICAgICAgICAgKD89LipbYS16XSkgICAgICAgLy8gc2hvdWxkIGNvbnRhaW4gYXQgbGVhc3Qgb25lIGxvd2VyIGNhc2VcclxuICAgICAgICAgICAgICAgICg/PS4qW0EtWl0pICAgICAgIC8vIHNob3VsZCBjb250YWluIGF0IGxlYXN0IG9uZSB1cHBlciBjYXNlXHJcbiAgICAgICAgICAgICAgICBbYS16QS1aMC05XXs4LH0gICAvLyBzaG91bGQgY29udGFpbiBhdCBsZWFzdCA4IGZyb20gdGhlIG1lbnRpb25lZCBjaGFyYWN0ZXJzICAqL1xyXG4gICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPT09ICdzaWdudXAnKSB7ICAvL9C10YHQu9C4INC80Ysg0L3QsCBzaWdudXAsINGC0L4g0L3Rg9C20L3RiyDQv9C+0LvRjyBuYW1lINC4IGxhc3ROYW1lXHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLnVuc2hpZnQoeyAvL9C00L7QsdCw0LLQu9GP0LXQvCDQuNGFINCyINC90LDRh9Cw0LvQviB0aGlzLmZpZWxkc1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ25hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9eW9CQLdCvXVvQsC3Rj10rXFxzKiQvLCAvL9GA0LXQs9GD0LvRj9GA0LrQsCDQn9C10YDQstCw0Y8g0LfQsNCz0LvQsNCy0L3QsNGPICsg0LvRjtCx0L7QtSDQutC+0Lst0LLQviDQsdGD0LrQslxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2xhc3ROYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2xhc3QtbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICByZWdleDogL15b0JAt0K9dW9CwLdGPXStcXHMqJC8sIC8v0YDQtdCz0YPQu9GP0YDQutCwINCf0LXRgNCy0LDRjyDQt9Cw0LPQu9Cw0LLQvdCw0Y8gKyDQu9GO0LHQvtC1INC60L7Quy3QstC+INCx0YPQutCyXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0aGF0OiBGb3JtID0gdGhpcztcclxuICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKChpdGVtOiBGb3JtRmllbGRUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZWxlbWVudC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbGlkYXRlRmllbGQuY2FsbCh0aGF0LCBpdGVtLCA8SFRNTElucHV0RWxlbWVudD50aGlzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9jZXNzJyk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzRWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9jZXNzRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gJ3NpZ251cCcpIHtcclxuICAgICAgICAgICAgdGhpcy5hZ3JlZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hZ3JlZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWdyZWVFbGVtZW50Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVGaWVsZChmaWVsZDogRm9ybUZpZWxkVHlwZSwgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LnZhbHVlIHx8ICFlbGVtZW50LnZhbHVlLm1hdGNoKGZpZWxkLnJlZ2V4KSkge1xyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmVkJzsgLy/QutGA0LDRgdC40Lwg0YDQsNC80LrRgyDRgNC+0LTQuNGC0LXQu9GOXHJcbiAgICAgICAgICAgICAgICBmaWVsZC52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAvLyDRg9C00LDQu9C40Lwg0L/QvtC60YDQsNGB0LrRgyDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0Lkg0YDQsNC80LrQuFxyXG4gICAgICAgICAgICAgICAgZmllbGQudmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRGb3JtOiBib29sZWFuID0gdGhpcy5maWVsZHMuZXZlcnkoaXRlbSA9PiBpdGVtLnZhbGlkKTtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkOiBib29sZWFuID0gdGhpcy5hZ3JlZUVsZW1lbnQgPyB0aGlzLmFncmVlRWxlbWVudC5jaGVja2VkICYmIHZhbGlkRm9ybSA6IHZhbGlkRm9ybTtcclxuICAgICAgICAvLyDQtdGB0LvQuCB0aGlzLmFncmVlRWxlbWVudCB0cnVlLCDRgtC+INC/0YDQvtCy0LXRgNGP0LXQvCBjaGVja2VkICYmIHZhbGlkRm9ybSwg0LjQvdCw0YfQtSDRgtC+0LvRjNC60L4gdmFsaWRGb3JtXHJcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcHJvY2Vzc0Zvcm0oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcclxuICAgICAgICAgICAgLy8g0LLRi9C90L7RgdC40Lwg0L7RgtC00LXQu9GM0L3QviDQv9C+0LjRgdC6INC30L3QsNGH0LXQvdC40LkgZW1haWwg0LggcGFzc3dvcmQsINC/0L7RgtC+0LzRgyDRh9GC0L4g0L7QvdC4INC90YPQttC90Ysg0Lgg0L/RgNC4INGA0LXQs9C40YHRgtGA0LDRhtC40Lgg0Lgg0L/RgNC4INCy0YXQvtC00LUuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy5maWVsZHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gJ2VtYWlsJyk/LmVsZW1lbnQ/LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICdwYXNzd29yZCcpPy5lbGVtZW50Py52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPT09ICdzaWdudXAnKSB7IC8v0LXRgdC70Lgg0LzRiyDQvdCwINGB0YLRgNCw0L3QuNGG0LUgc2lnbnVwXHJcbiAgICAgICAgICAgICAgICAvL9C30LDQutC40LTRi9Cy0LDQtdC8INC90LAg0LHRjdC60LXQvdC0INCyIGJvZHkg0LLQstC10LTQtdC90L3Ri9C1INC/0L7Qu9GPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjzpcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBTaWdudXBSZXNwb25zZVR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3NpZ251cCcsIFwiUE9TVFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZmllbGRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09ICduYW1lJyk/LmVsZW1lbnQ/LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdGhpcy5maWVsZHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gJ2xhc3ROYW1lJyk/LmVsZW1lbnQ/LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8ICFyZXN1bHQudXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyAvLyDQvdGD0LbQvdC+INCy0YvQudGC0Lgg0LjQtyDRhNGD0L3QutGG0LjQuCwg0LXRgdC70Lgg0L7RiNC40LHQutCwINC/0YDQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v0Lgg0LIg0LvRjtCx0L7QvCDRgdC70YPRh9Cw0LUg0L/Ri9GC0LDQtdC80YHRjyDQsNCy0YLQvtGA0LjQt9C+0LLQsNGC0YzRgdGPXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IExvZ2luUmVzcG9uc2VUeXBlID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy9sb2dpbicsIFwiUE9TVFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yIHx8ICFyZXN1bHQuYWNjZXNzVG9rZW4gfHwgIXJlc3VsdC5yZWZyZXNoVG9rZW4gfHwgIXJlc3VsdC5mdWxsTmFtZSB8fCAhcmVzdWx0LnVzZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aC5zZXRUb2tlbnMocmVzdWx0LmFjY2Vzc1Rva2VuLCByZXN1bHQucmVmcmVzaFRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBBdXRoLnNldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWU6IHJlc3VsdC5mdWxsTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiByZXN1bHQudXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBBdXRoLnNldFVzZXJFbWFpbChyZXN1bHQuZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy9jaG9pY2UnOyAvL9C/0LXRgNC10LLQvtC00LjQvCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0L3QsCDQvdC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7VXJsTWFuYWdlcn0gZnJvbSBcIi4uL3V0aWxzL3VybC1tYW5hZ2VyXCI7XHJcbmltcG9ydCB7Q3VzdG9tSHR0cH0gZnJvbSBcIi4uL3NlcnZpY2VzL2N1c3RvbS1odHRwXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aFwiO1xyXG5pbXBvcnQge1F1ZXJ5UGFyYW1zVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1ZXJ5LXBhcmFtcy50eXBlXCI7XHJcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcclxuaW1wb3J0IHtEZWZhdWx0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvZGVmYXVsdC1yZXNwb25zZS50eXBlXCI7XHJcbmltcG9ydCB7UGFzc1Rlc3RSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9wYXNzLXRlc3QtcmVzcG9uc2UudHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3VsdCB7XHJcbiAgICBwcml2YXRlIHJvdXRlUGFyYW1zOiBRdWVyeVBhcmFtc1R5cGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJvdXRlUGFyYW1zID0gVXJsTWFuYWdlci5nZXRRdWVyeVBhcmFtcygpO1xyXG4gICAgICAgIC8vIFVybE1hbmFnZXIuY2hlY2tSZXN1bHREYXRhKHRoaXMucm91dGVQYXJhbXMpO1xyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQtc2NvcmUnKS5pbm5lclRleHQgPSB0aGlzLnJvdXRlUGFyYW1zLnNjb3JlICsgJy8nICsgdGhpcy5yb3V0ZVBhcmFtcy50b3RhbDtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLnJvdXRlUGFyYW1zLmlkO1xyXG4gICAgICAgIGxldCBuZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctYW5zd2VycycpO1xyXG4gICAgICAgIG5leHQub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjL2Fuc3dlcnM/aWQ9JyArIGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpOyAvL9Cx0LXRgNC10Lwg0LjQtyBsb2NhbFN0b3JhZ2Ug0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C1XHJcbiAgICAgICAgaWYoIXVzZXJJbmZvKXtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5yb3V0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBEZWZhdWx0UmVzcG9uc2VUeXBlIHwgUGFzc1Rlc3RSZXNwb25zZVR5cGUgPSBhd2FpdCBDdXN0b21IdHRwLnJlcXVlc3QoY29uZmlnLmhvc3QgKyAnL3Rlc3RzLycgKyB0aGlzLnJvdXRlUGFyYW1zLmlkICsgJy9yZXN1bHQ/dXNlcklkPScgKyB1c2VySW5mby51c2VySWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIERlZmF1bHRSZXNwb25zZVR5cGUpLmVycm9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdFNjb3JlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC1zY29yZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRTY29yZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0U2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IChyZXN1bHQgYXMgUGFzc1Rlc3RSZXNwb25zZVR5cGUpLnNjb3JlICsgJy8nICsgKHJlc3VsdCBhcyBQYXNzVGVzdFJlc3BvbnNlVHlwZSkudG90YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1VybE1hbmFnZXJ9IGZyb20gXCIuLi91dGlscy91cmwtbWFuYWdlclwiO1xyXG5pbXBvcnQge0N1c3RvbUh0dHB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jdXN0b20taHR0cFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtRdWVyeVBhcmFtc1R5cGV9IGZyb20gXCIuLi90eXBlcy9xdWVyeS1wYXJhbXMudHlwZVwiO1xyXG5pbXBvcnQge1F1aXpBbnN3ZXJUeXBlLCBRdWl6UXVlc3Rpb25UeXBlLCBRdWl6VHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1aXoudHlwZVwiO1xyXG5pbXBvcnQge1VzZXJSZXN1bHRUeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1yZXN1bHQudHlwZVwiO1xyXG5pbXBvcnQge0RlZmF1bHRSZXNwb25zZVR5cGV9IGZyb20gXCIuLi90eXBlcy9kZWZhdWx0LXJlc3BvbnNlLnR5cGVcIjtcclxuaW1wb3J0IHtBY3Rpb25UZXN0VHlwZX0gZnJvbSBcIi4uL3R5cGVzL2FjdGlvbi10ZXN0LnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuLi90eXBlcy91c2VyLWluZm8udHlwZVwiO1xyXG5pbXBvcnQge1Bhc3NUZXN0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcGFzcy10ZXN0LXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0IHtcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uVGl0bGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIG5leHRCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHBhc3NCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHByZXZCdXR0b25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIG9wdGlvbnNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHF1aXo6IFF1aXpUeXBlIHwgbnVsbDtcclxuICAgIHByaXZhdGUgY3VycmVudFF1ZXN0aW9uSW5kZXg6IG51bWJlcjtcclxuICAgIHJlYWRvbmx5IHVzZXJSZXN1bHQ6IFVzZXJSZXN1bHRUeXBlW107XHJcbiAgICBwcml2YXRlIHJvdXRlUGFyYW1zOiBRdWVyeVBhcmFtc1R5cGU7XHJcbiAgICBwcml2YXRlIGludGVydmFsOiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnF1aXogPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBhc3NCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLnVzZXJSZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnJvdXRlUGFyYW1zID0gVXJsTWFuYWdlci5nZXRRdWVyeVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMucm91dGVQYXJhbXMuaWQpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogRGVmYXVsdFJlc3BvbnNlVHlwZSB8IFF1aXpUeXBlID0gYXdhaXQgQ3VzdG9tSHR0cC5yZXF1ZXN0KGNvbmZpZy5ob3N0ICsgJy90ZXN0cy8nICsgdGhpcy5yb3V0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkuZXJyb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWl6ID0gcmVzdWx0IGFzIFF1aXpUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRRdWl6KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydFF1aXooKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5xdWl6KSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLWJhcicpO1xyXG5cclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHRpb25zJyk7XHJcblxyXG4gICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dCcpO1xyXG4gICAgICAgIGlmICh0aGlzLm5leHRCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQub25jbGljayA9IHRoaXMubW92ZS5iaW5kKHRoaXMsIEFjdGlvblRlc3RUeXBlLm5leHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYXNzQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzJyk7XHJcbiAgICAgICAgaWYgKHRoaXMucGFzc0J1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXNzQnV0dG9uRWxlbWVudC5vbmNsaWNrID0gdGhpcy5tb3ZlLmJpbmQodGhpcywgQWN0aW9uVGVzdFR5cGUucGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXYnKTtcclxuICAgICAgICBpZiAodGhpcy5wcmV2QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50Lm9uY2xpY2sgPSB0aGlzLm1vdmUuYmluZCh0aGlzLCBBY3Rpb25UZXN0VHlwZS5wcmV2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByZVRpdGxlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZS10aXRsZScpO1xyXG4gICAgICAgIGlmIChwcmVUaXRsZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcHJlVGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucXVpei5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmVwYXJlUHJvZ3Jlc3NCYXIoKTtcclxuICAgICAgICB0aGlzLnNob3dRdWVzdGlvbigpO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1lckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gNTk7XHJcbiAgICAgICAgY29uc3QgdGhhdDogVGVzdCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlY29uZHMtLTtcclxuICAgICAgICAgICAgaWYgKHRpbWVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGltZXJFbGVtZW50LmlubmVyVGV4dCA9IHNlY29uZHMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2Vjb25kcyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGF0LmludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVwYXJlUHJvZ3Jlc3NCYXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1aXopIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0YHRgtGA0YPQutGC0YPRgNGDIGh0bWwg0LTQvtC60YPQvNC10L3RgtCwIFwidGVzdC1wcm9ncmVzcy1iYXJcIlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5xdWl6LnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGl0ZW1FbGVtZW50LmNsYXNzTmFtZSA9ICd0ZXN0LXByb2dyZXNzLWJhci1pdGVtJyArIChpID09PSAwID8gJyBhY3RpdmUnIDogJycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbUNpcmNsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBpdGVtQ2lyY2xlRWxlbWVudC5jbGFzc05hbWUgPSAndGVzdC1wcm9ncmVzcy1iYXItaXRlbS1jaXJjbGUnO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbVRleHRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaXRlbVRleHRFbGVtZW50LmNsYXNzTmFtZSA9ICd0ZXN0LXByb2dyZXNzLWJhci1pdGVtLXRleHQnO1xyXG4gICAgICAgICAgICBpdGVtVGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gJ9CS0L7Qv9GA0L7RgSAnICsgKGkgKyAxKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1FbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1DaXJjbGVFbGVtZW50KTtcclxuICAgICAgICAgICAgaXRlbUVsZW1lbnQuYXBwZW5kQ2hpbGQoaXRlbVRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyRWxlbWVudC5hcHBlbmRDaGlsZChpdGVtRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UXVlc3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1aXopIHJldHVybjtcclxuICAgICAgICBjb25zdCBhY3RpdmVRdWVzdGlvbjogUXVpelF1ZXN0aW9uVHlwZSA9IHRoaXMucXVpei5xdWVzdGlvbnNbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCAtIDFdO1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uVGl0bGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25UaXRsZUVsZW1lbnQuaW5uZXJIVE1MID0gJzxzcGFuPtCS0L7Qv9GA0L7RgSAnICsgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleFxyXG4gICAgICAgICAgICAgICAgKyAnOjwvc3Bhbj4gJyArIGFjdGl2ZVF1ZXN0aW9uLnF1ZXN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50LmlubmVySFRNTCA9ICcnOyAvL9GD0LTQsNC70LjQvCDRgtC10LrRg9GJ0LjQtSDQvtGC0LLQtdGC0YtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRoYXQ6IFRlc3QgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGNob3Nlbk9wdGlvbjogVXNlclJlc3VsdFR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnVzZXJSZXN1bHQuZmluZChpdGVtID0+IGl0ZW0ucXVlc3Rpb25JZCA9PT0gYWN0aXZlUXVlc3Rpb24uaWQpOyAvL9GH0YLQvtCx0Ysg0L7RgtGA0LjRgdC+0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C5INGA0LDQvdC10LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10Lwg0LLRi9Cx0L7RgCByYWRpbywg0LjRidC10Lwg0LXRgdGC0Ywg0LIg0LzQsNGB0YHQuNCy0LUg0Y3RgtC+0YIg0LLRi9Cx0L7RgFxyXG5cclxuICAgICAgICAvL9C4INGA0LDQt9C80LXRidCw0LXQvCDRgdGC0YDRg9C60YLRg9GA0YMgaHRtbCDRgSDQstCw0YDQuNCw0L3RgtCw0LzQuCDQvtGC0LLQtdGC0L7QslxyXG4gICAgICAgIGFjdGl2ZVF1ZXN0aW9uLmFuc3dlcnMuZm9yRWFjaCgoYW5zd2VyOlF1aXpBbnN3ZXJUeXBlKSA9PiB7XHJcbi8v0YHQvtC30LTQsNC10Lwg0YHRgtGA0L7QutGDIDxkaXYgY2xhc3M9XCJ0ZXN0LXF1ZXN0aW9uLW9wdGlvblwiPlxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgb3B0aW9uRWxlbWVudC5jbGFzc05hbWUgPSAndGVzdC1xdWVzdGlvbi1vcHRpb24nO1xyXG4vL9GB0L7Qt9C00LDQtdC8INGB0YLRgNC+0LrRgyA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJhbnN3ZXItb25lXCIgbmFtZT1cImFuc3dlclwiPlxyXG4gICAgICAgICAgICBjb25zdCBpbnB1dElkID0gJ2Fuc3dlci0nICsgYW5zd2VyLmlkXHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTmFtZSA9ICdvcHRpb24tYW5zd2VyJztcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpbnB1dElkKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdyYWRpbycpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2Fuc3dlcicpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGFuc3dlci5pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgaWYgKGNob3Nlbk9wdGlvbiAmJiBjaG9zZW5PcHRpb24uY2hvc2VuQW5zd2VySWQgPT09IGFuc3dlci5pZCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNob29zZUFuc3dlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4vL9GB0L7Qt9C00LDQtdC8INGB0YLRgNC+0LrRgyA8bGFiZWwgZm9yPVwiYW5zd2VyLW9uZVwiPtCS0LDRgNC40LDQvdGCINC+0YLQstC10YLQsCAxIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnZm9yJywgaW5wdXRJZCk7XHJcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5pbm5lclRleHQgPSBhbnN3ZXIuYW5zd2VyO1xyXG5cclxuLy/RgdC+0LfQtNCw0LXQvCDQvdGD0LbQvdGD0Y4g0L3QsNC8INCy0LvQvtC20LXQvdC90L7RgdGC0Ywg0Y3Qu9C10LzQtdC90YLQvtCyINC/0L4g0L/RgNC40LzQtdGA0YMg0LjQtyB0ZXN0Lmh0bWw6XHJcbiAgICAgICAgICAgIC8qIDxkaXYgY2xhc3NOYW1lPVwidGVzdC1xdWVzdGlvbi1vcHRpb25zXCIgaWQ9XCJvcHRpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXN0LXF1ZXN0aW9uLW9wdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJhbnN3ZXItb25lXCIgbmFtZT1cImFuc3dlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImFuc3dlci1vbmVcIj7QktCw0YDQuNCw0L3RgiDQvtGC0LLQtdGC0LAgMSA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgPC9kaXY+ICovXHJcblxyXG4gICAgICAgICAgICBvcHRpb25FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIG9wdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5uZXh0QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoY2hvc2VuT3B0aW9uICYmIGNob3Nlbk9wdGlvbi5jaG9zZW5BbnN3ZXJJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubmV4dEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPT09IHRoaXMucXVpei5xdWVzdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9ICfQl9Cw0LLQtdGA0YjQuNGC0YwnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0QnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSAn0JTQsNC70LXQtSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByZXZCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2QnV0dG9uRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZCdXR0b25FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNob29zZUFuc3dlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5uZXh0QnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5leHRCdXR0b25FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZlKGFjdGlvbjogQWN0aW9uVGVzdFR5cGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucXVpeikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBhY3RpdmVRdWVzdGlvbjogUXVpelF1ZXN0aW9uVHlwZSA9IHRoaXMucXVpei5xdWVzdGlvbnNbdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCAtIDFdO1xyXG4gICAgICAgIGNvbnN0IGNob3NlbkFuc3dlcjogSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZCA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B0aW9uLWFuc3dlcicpKS5maW5kKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcclxuICAgICAgICB9KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGxldCBjaG9zZW5BbnN3ZXJJZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGNob3NlbkFuc3dlciAmJiBjaG9zZW5BbnN3ZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgY2hvc2VuQW5zd2VySWQgPSBOdW1iZXIoY2hvc2VuQW5zd2VyLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUmVzdWx0OiBVc2VyUmVzdWx0VHlwZSB8IHVuZGVmaW5lZCA9IHRoaXMudXNlclJlc3VsdC5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5xdWVzdGlvbklkID09PSBhY3RpdmVRdWVzdGlvbi5pZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjaG9zZW5BbnN3ZXJJZCkge1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVzdWx0LmNob3NlbkFuc3dlcklkID0gY2hvc2VuQW5zd2VySWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJSZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25JZDogYWN0aXZlUXVlc3Rpb24uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VuQW5zd2VySWQ6IGNob3NlbkFuc3dlcklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSBBY3Rpb25UZXN0VHlwZS5uZXh0IHx8IGFjdGlvbiA9PT0gQWN0aW9uVGVzdFR5cGUucGFzcykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbkluZGV4Kys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXggPiB0aGlzLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyRWxlbWVudCkge1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvZ3Jlc3NCYXJFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKChpdGVtOiBFbGVtZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50SXRlbUluZGV4OiBudW1iZXIgPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtSW5kZXggPT09IHRoaXMuY3VycmVudFF1ZXN0aW9uSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbUluZGV4IDwgdGhpcy5jdXJyZW50UXVlc3Rpb25JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1F1ZXN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBjb21wbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB1c2VySW5mbzogVXNlckluZm9UeXBlIHwgbnVsbCA9IEF1dGguZ2V0VXNlckluZm8oKTsgLy/QsdC10YDQtdC8INC40LcgbG9jYWxTdG9yYWdlINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtVxyXG4gICAgICAgIGlmKCF1c2VySW5mbykge1xyXG4gICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IERlZmF1bHRSZXNwb25zZVR5cGUgfCBQYXNzVGVzdFJlc3BvbnNlVHlwZSA9IGF3YWl0IEN1c3RvbUh0dHAucmVxdWVzdChjb25maWcuaG9zdCArICcvdGVzdHMvJyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnL3Bhc3MnLCAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySW5mby51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogdGhpcy51c2VyUmVzdWx0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBEZWZhdWx0UmVzcG9uc2VUeXBlKS5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChyZXN1bHQgYXMgRGVmYXVsdFJlc3BvbnNlVHlwZSkubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvcmVzdWx0P2lkPScgKyB0aGlzLnJvdXRlUGFyYW1zLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/RgdGC0LDRgNGL0Lkg0LTQvtC00LXQu9Cw0L3QvdGL0Lkg0LIg0JrQoCDQutC+0LRcclxuICAgICAgICAvKmNvbnN0IHVzZXJBbnN3ZXJzID0gdGhpcy51c2VyUmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uY2hvc2VuQW5zd2VySWQpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJBbnN3ZXJzU3RyaW5nID0gdXNlckFuc3dlcnMuam9pbignLCcpO1xyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnIy9yZXN1bHQ/c2NvcmU9JyArIHJlc3VsdC5zY29yZSArICcmdG90YWw9JyArIHJlc3VsdC50b3RhbCArICcmaWQ9JyArIHRoaXMucm91dGVQYXJhbXMuaWQgKyAnJmFuc3dlcnM9JyArIHVzZXJBbnN3ZXJzU3RyaW5nO1xyXG4gICAgICAgICovXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtGb3JtfSBmcm9tIFwiLi9jb21wb25lbnRzL2Zvcm1cIjtcclxuaW1wb3J0IHtDaG9pY2V9IGZyb20gXCIuL2NvbXBvbmVudHMvY2hvaWNlXCI7XHJcbmltcG9ydCB7VGVzdH0gZnJvbSBcIi4vY29tcG9uZW50cy90ZXN0XCI7XHJcbmltcG9ydCB7UmVzdWx0fSBmcm9tIFwiLi9jb21wb25lbnRzL3Jlc3VsdFwiO1xyXG5pbXBvcnQge0Fuc3dlcnN9IGZyb20gXCIuL2NvbXBvbmVudHMvYW5zd2Vyc1wiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuL3NlcnZpY2VzL2F1dGhcIjtcclxuaW1wb3J0IHtSb3V0ZVR5cGV9IGZyb20gXCIuL3R5cGVzL3JvdXRlLnR5cGVcIjtcclxuaW1wb3J0IHtVc2VySW5mb1R5cGV9IGZyb20gXCIuL3R5cGVzL3VzZXItaW5mby50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcclxuICAgIHJlYWRvbmx5IGNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICByZWFkb25seSBzdHlsZXNFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICByZWFkb25seSB0aXRsZUVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIHJlYWRvbmx5IHByb2ZpbGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICByZWFkb25seSBwcm9maWxlRnVsbE5hbWVFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBwcml2YXRlIHJvdXRlczogUm91dGVUeXBlW107XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JyksXHJcbiAgICAgICAgdGhpcy5zdHlsZXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0eWxlcycpLFxyXG4gICAgICAgIHRoaXMudGl0bGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJyksXHJcbiAgICAgICAgdGhpcy5wcm9maWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9maWxlJyksXHJcbiAgICAgICAgdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGUtZnVsbC1uYW1lJyksXHJcblxyXG4gICAgICAgIHRoaXMucm91dGVzID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogJyMvJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0JPQu9Cw0LLQvdCw0Y8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6ICdzdHlsZXMvaW5kZXguY3NzJyxcclxuICAgICAgICAgICAgICAgIGxvYWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL3NpZ251cCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Cg0LXQs9C40YHRgtGA0LDRhtC40Y8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvc2lnbnVwLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzOiAnc3R5bGVzL2Zvcm0uY3NzJyxcclxuICAgICAgICAgICAgICAgIGxvYWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRm9ybSgnc2lnbnVwJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9CS0YXQvtC0INCyINGB0LjRgdGC0LXQvNGDICcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogJ3N0eWxlcy9mb3JtLmNzcycsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZvcm0oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiAnIy9jaG9pY2UnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQktGL0LHQvtGAINGC0LXRgdGC0LAnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvY2hvaWNlLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzOiAnc3R5bGVzL2Nob2ljZS5jc3MnLFxyXG4gICAgICAgICAgICAgICAgbG9hZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDaG9pY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL3Rlc3QnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfQn9GA0L7RhdC+0LbQtNC10L3QuNC1INGC0LXRgdGC0LAnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd0ZW1wbGF0ZXMvdGVzdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogJ3N0eWxlcy90ZXN0LmNzcycsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRlc3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6ICcjL3Jlc3VsdCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Cg0LXQt9GD0LvRjNGC0LDRgicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ3RlbXBsYXRlcy9yZXN1bHQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6ICdzdHlsZXMvcmVzdWx0LmNzcycsXHJcbiAgICAgICAgICAgICAgICBsb2FkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogJyMvYW5zd2VycycsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Ce0YLQstC10YLRiyDQvdCwINGC0LXRgdGCJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAndGVtcGxhdGVzL2Fuc3dlcnMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6ICdzdHlsZXMvYW5zd2Vycy5jc3MnLFxyXG4gICAgICAgICAgICAgICAgbG9hZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBBbnN3ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuUm91dGUoKTogUHJvbWlzZTx2b2lkPiB7IC8vINGE0YPQvdC60YbQuNGPINCy0YvQsdC10YDQtdGCINC60LDQutC+0Lkg0YDQvtGD0YIg0LfQsNCz0YDRg9C30LjRgtGMINC40YHRhdC+0LTRjyDQuNC3INGC0LXQutGB0YLQsCDQsiDQsNC00YDQtdGB0L3QvtC5INGB0YLRgNC+0LrQtVxyXG4gICAgICAgIGNvbnN0IHVybFJvdXRlOiBzdHJpbmcgPSAgd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoJz8nKVswXTsvL3NwbGl0INGA0LDQt9C00LXQu9C40YIg0LDQtNGA0LXRgdC90YPRjiDRgdGC0YDQvtC60YMg0LTQviA/LCDQsCBbMF0g0LLQvtC30YzQvNC10YIg0L/QtdGA0LLRg9GOINGH0LDRgdGC0YxcclxuICAgICAgICBpZiAodXJsUm91dGUgPT09ICcjL2xvZ291dCcpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBib29sZWFuID0gIGF3YWl0IEF1dGgubG9nT3V0KCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vLi4uXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld1JvdXRlOiBSb3V0ZVR5cGUgfCB1bmRlZmluZWQgPSB0aGlzLnJvdXRlcy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZSA9PT0gdXJsUm91dGU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZighbmV3Um91dGUpIHsgLy8g0LXRgdC70Lgg0LzRiyDQvdC1INC90LDQudC00LXQvCDQsiDQsNC00YDQtdGB0L3QvtC5INGB0YLRgNC+0LrQtSDQvdC40YfQtdCz0L4g0LjQtyDQv9C10YDQtdGH0LjRgdC70LXQvdC90L7Qs9C+INCyIHJvdXRlcywg0LfQsNCz0YDRg9C30LjQvCDQs9C70LDQstC90YPRjiDRgdGC0YDQsNC90LjRhtGDINC90LDRiNC10LPQviBTUEFcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy8nO1xyXG4gICAgICAgICAgICByZXR1cm47IC8vINC+0LHRj9C30LDRgtC10LvRjNC90L4g0L3Rg9C20L3QviDQt9Cw0LLQtdGA0YjQuNGC0Ywg0Y3RgtGDINGE0YPQvdC60YbQuNGOLCDRh9GC0L7QsdGLINC00LDQu9GM0YjQtSDQvdC40YfQtdCz0L4g0LfQsCDQvdC10Lkg0L3QtSDQv9GA0L7QuNGB0YXQvtC00LjQu9C+LlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRFbGVtZW50IHx8ICF0aGlzLnN0eWxlc0VsZW1lbnQgfHwgIXRoaXMudGl0bGVFbGVtZW50IHx8ICF0aGlzLnByb2ZpbGVFbGVtZW50IHx8ICF0aGlzLnByb2ZpbGVGdWxsTmFtZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHVybFJvdXRlID09PSAnIy8nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjLyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBhd2FpdCBmZXRjaChuZXdSb3V0ZS50ZW1wbGF0ZSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpO1xyXG4gICAgICAgIHRoaXMuc3R5bGVzRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBuZXdSb3V0ZS5zdHlsZXMpO1xyXG4gICAgICAgIHRoaXMudGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IG5ld1JvdXRlLnRpdGxlO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBVc2VySW5mb1R5cGUgfCBudWxsID0gQXV0aC5nZXRVc2VySW5mbygpOyAvL9Cx0LXRgNC10Lwg0LjQtyBsb2NhbFN0b3JhZ2Ug0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C1XHJcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IG51bGwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBdXRoLmFjY2Vzc1Rva2VuS2V5KTsgLy/Qv9GA0L7QstC10YDRj9C10Lwg0LXRgdGC0Ywg0LvQuCDQsiBsb2NhbFN0b3JhZ2UgYWNjZXNzVG9rZW5LZXlcclxuICAgICAgICBpZiAodXNlckluZm8gJiYgYWNjZXNzVG9rZW4pIHsgLy/QtdGB0LvQuCDQtNCwXHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JzsgLy/QvtGC0L7QsdGA0LDQttCw0LXQvCDQsdC70L7QuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuICAgICAgICAgICAgdGhpcy5wcm9maWxlRnVsbE5hbWVFbGVtZW50LmlubmVyVGV4dCA9IHVzZXJJbmZvLmZ1bGxOYW1lOyAvL9C/0LjRiNC10Lwg0LjQvNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgLy/RgdC60YDRi9Cy0LDQtdC8INCx0LvQvtC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdSb3V0ZS5sb2FkKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCB7VXNlckluZm9UeXBlfSBmcm9tIFwiLi4vdHlwZXMvdXNlci1pbmZvLnR5cGVcIjtcclxuaW1wb3J0IHtSZWZyZXNoUmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvcmVmcmVzaC1yZXNwb25zZS50eXBlXCI7XHJcbmltcG9ydCB7TG9nb3V0UmVzcG9uc2VUeXBlfSBmcm9tIFwiLi4vdHlwZXMvbG9nb3V0LXJlc3BvbnNlLnR5cGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFjY2Vzc1Rva2VuS2V5OiBzdHJpbmcgPSAnYWNjZXNzVG9rZW4nO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVmcmVzaFRva2VuS2V5OiBzdHJpbmcgPSAncmVmcmVzaFRva2VuJztcclxuICAgIHByaXZhdGUgc3RhdGljIHVzZXJJbmZvS2V5OiBzdHJpbmcgPSAndXNlckluZm8nO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdXNlckVtYWlsOiBzdHJpbmcgPSAndXNlckVtYWlsJ1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHByb2Nlc3NVbmF1dGhvcml6ZWRSZXNwb25zZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCByZWZyZXNoVG9rZW46IHN0cmluZyB8IG51bGwgPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5yZWZyZXNoVG9rZW5LZXkpO1xyXG4gICAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY29uZmlnLmhvc3QgKyAnL3JlZnJlc2gnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7cmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW59KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUmVmcmVzaFJlc3BvbnNlVHlwZSB8IG51bGwgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmICFyZXN1bHQuZXJyb3IgJiYgcmVzdWx0LmFjY2Vzc1Rva2VuICYmIHJlc3VsdC5yZWZyZXNoVG9rZW4gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUb2tlbnMocmVzdWx0LmFjY2Vzc1Rva2VuLCByZXN1bHQucmVmcmVzaFRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVUb2tlbnMoKTsgLy/QtdGB0LvQuCDQt9Cw0L/RgNC+0YEg0YEg0L7RiNC40LHQutC+0LksINGD0LTQsNC70LjQvCDRgtC+0LrQtdC90YtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJyMvJzsgLy/QuCDQvtGC0L/RgNCw0LLQu9GP0YLRjCDQvdCwINCz0LvQsNCy0L3Rg9GOXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9nT3V0KCk6UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuOiBzdHJpbmcgfCBudWxsID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KTtcclxuICAgICAgICBpZiAocmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKGNvbmZpZy5ob3N0ICsgJy9sb2dvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7cmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW59KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogTG9nb3V0UmVzcG9uc2VUeXBlIHwgYW55ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiAhcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0aC5yZW1vdmVUb2tlbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnVzZXJJbmZvS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRUb2tlbnMoYWNjZXNzVG9rZW46IHN0cmluZywgcmVmcmVzaFRva2VuOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmFjY2Vzc1Rva2VuS2V5LCBhY2Nlc3NUb2tlbilcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnJlZnJlc2hUb2tlbktleSwgcmVmcmVzaFRva2VuKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlbW92ZVRva2VucygpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmFjY2Vzc1Rva2VuS2V5KVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMucmVmcmVzaFRva2VuS2V5KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VXNlckluZm8oaW5mbzogVXNlckluZm9UeXBlKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy51c2VySW5mb0tleSwgSlNPTi5zdHJpbmdpZnkoaW5mbykpOyAvL9GF0YDQsNC90LjRgtGMINC+0LHRitC10LrRgiDQsiBsb2NhbFN0b3JhZ2Ug0L3QtdC70YzQt9GPLCDQv9C+0Y3RgtC+0LzRgyDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsiDRgdGC0YDQvtC60YNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFVzZXJJbmZvKCk6IFVzZXJJbmZvVHlwZSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvOiBzdHJpbmcgfCBudWxsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy51c2VySW5mb0tleSk7XHJcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHVzZXJJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFVzZXJFbWFpbChlbWFpbDogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7IC8vINC00L7Qv9C40YHRi9Cy0LDQuyDRgdCw0LxcclxuICAgICAgICBpZiAoZW1haWwpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy51c2VyRW1haWwsIGVtYWlsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnVzZXJFbWFpbCwgJ25vbmUnKTsgLy/QtdGB0LvQuCBlbWFpbCDQvdC1INC/0YDQuNGI0LXQuywg0LfQsNC/0LjRiNC10Lwg0LIgbG9jYWxTdG9yYWdlICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXNlckVtYWlsKCk6IHN0cmluZyB8IG51bGwgeyAvLyDQtNC+0L/QuNGB0YvQstCw0Lsg0YHQsNC8XHJcbiAgICAgICAgY29uc3QgdXNlckVtYWlsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy51c2VyRW1haWwpO1xyXG4gICAgICAgIGlmICh1c2VyRW1haWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJFbWFpbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iLCJcclxuLy/RgdC10YDQstC40YEg0LTQu9GPINGB0L7Qt9C00LDQvdC40Y8gaHR0cC3Qt9Cw0L/RgNC+0YHQsCDQvdCwINGB0LXRgNCy0LXRgCAoYmFja2VuZClcclxuLy8g0L/RgNC40L3QuNC80LDQtdC8IDMg0L/QsNGA0LDQvNC10YLRgNCwOiB1cmwsIG1ldGhvZCAo0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gR0VUKSDQuCBib2R5ICjQv9C+INGD0LzQvtC70YfQsNC90LjRjiBudWxsKVxyXG5cclxuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi9hdXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlcXVlc3QodXJsOnN0cmluZywgbWV0aG9kOnN0cmluZyA9IFwiR0VUXCIsIGJvZHk6IGFueSA9ICBudWxsKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zdCBwYXJhbXM6IGFueSA9IHsgLy/RjdGC0L4g0YHRgtCw0L3QtNCw0YDRgtC90YvQtSDQv9Cw0YDQsNC80LXRgtGA0Ysg0L3QsNGI0LXQs9C+INC30LDQv9GA0L7RgdCwXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCB0b2tlbjogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEF1dGguYWNjZXNzVG9rZW5LZXkpO1xyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBwYXJhbXMuaGVhZGVyc1sneC1hY2Nlc3MtdG9rZW4nXSA9IHRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJvZHkpIHsgLy/QtdGB0LvQuCBQT1NUINC30LDQv9GA0L7RgSDQuCDQsiDQvdC10Lwg0LXRgdGC0YwgYm9keVxyXG4gICAgICAgICAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBwYXJhbXMpOyAvL9C/0L7Qu9GD0YfQsNC10Lwg0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwXHJcbiAgICAgICAgLy8g0LvQvtCy0LjQvCDQvtGI0LjQsdC60YMg0L7RgtCy0LXRgtCwINGB0LXRgNCy0LXRgNCwXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA8IDIwMCB8fCByZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSkgeyAvL9C10YHQu9C4INC+0YLQstC10YIg0YHQtdGA0LLQtdGA0LAgdW5hdXRob3JpemVkXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IGJvb2xlYW4gPSBhd2FpdCBBdXRoLnByb2Nlc3NVbmF1dGhvcml6ZWRSZXNwb25zZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcXVlc3QodXJsLCBtZXRob2QsIGJvZHkpOyAvL9GA0LXQutGD0YDRgdC40Y8uINGH0YLQvtCx0Ysg0L/QvtC90Y/RgtGMLCDQv9GA0L7QudGC0LjRgdGMINC00LXQsdCw0LPQvtC8XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAgYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvL9Cy0L7Qt9Cy0YDQsNGJ0LDQtdC8INC+0YLQstC10YIg0YHQtdGA0LLQtdGA0LBcclxuICAgIH1cclxufSIsImV4cG9ydCBlbnVtIEFjdGlvblRlc3RUeXBlIHtcclxuICAgIG5leHQ9ICduZXh0JyxcclxuICAgIHBhc3M9ICdwYXNzJyxcclxuICAgIHByZXY9ICdwcmV2JyxcclxuXHJcbn0iLCJpbXBvcnQge1F1ZXJ5UGFyYW1zVHlwZX0gZnJvbSBcIi4uL3R5cGVzL3F1ZXJ5LXBhcmFtcy50eXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVXJsTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFF1ZXJ5UGFyYW1zKCk6IFF1ZXJ5UGFyYW1zVHlwZSB7XHJcbiAgICAgICAgY29uc3QgcXM6c3RyaW5nID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5zcGxpdCgnKycpLmpvaW4oJyAnKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30sXHJcbiAgICAgICAgICAgIHRva2VuczogUmVnRXhwRXhlY0FycmF5IHwgbnVsbCxcclxuICAgICAgICAgICAgcmU6IFJlZ0V4cCA9IC9bPyZdKFtePV0rKT0oW14mXSopL2c7XHJcblxyXG4gICAgICAgIHdoaWxlICh0b2tlbnMgPSByZS5leGVjKHFzKSkge1xyXG4gICAgICAgICAgICBwYXJhbXNbZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1sxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHRva2Vuc1syXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7Um91dGVyfSBmcm9tIFwiLi9yb3V0ZXJcIjtcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmhhbmRsZVJvdXRlQ2hhbmdpbmcuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVSb3V0ZUNoYW5naW5nLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlUm91dGVDaGFuZ2luZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5vcGVuUm91dGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKG5ldyBBcHAoKSk7IC8vINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1IGluZGV4Lmh0bWwg0LzRiyDQv9C10YDQtdC50LTQtdC8INCyIEFwcC5qcyDQuCDRgdGA0LDQt9GDINGH0YLQvtCx0Ysg0LrQu9Cw0YHRgSBBcHAg0YHRgNCw0LHQvtGC0LDQuywg0YHQvtC30LTQsNC10Lwg0LfQtNC10YHRjCDQvdC+0LLRi9C5INGN0LrQt9C10LzQv9C70Y/RgFxyXG4vLyDQsiDRgdC60L7QsdC60Lgg0L7QsdC10YDQvdGD0LvQuCDQtNC70Y8g0LrRgNCw0YHQvtGC0YsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=