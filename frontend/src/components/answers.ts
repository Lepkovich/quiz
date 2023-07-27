import {UrlManager} from "../utils/url-manager.ts";
import {Auth} from "../services/auth.ts";
import {CustomHttp} from "../services/custom-http.ts";
import config from "../../config/config";

export class Answers {

    constructor() {
        this.quiz = null;
        this.routeParams = UrlManager.getQueryParams();
        this.userData = null;
        this.init();

    }
    async init() {
        const userInfo = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        const userEmail = Auth.getUserEmail(); //берем из localStorage email
        if(!userInfo || !userEmail){
            location.href = '#/';
        }
        this.userData = userInfo.fullName + ', ' + userEmail;

        if(this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);
                // /api/tests/:id/result/details?userId=:userId
                if(result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    this.quiz = result;
                    this.showQuestions();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    showQuestions() {
        document.getElementById('pre-title').innerText = this.quiz.test.name;
        document.getElementById('user').querySelector('span').textContent = this.userData;

        const answersBlock = document.getElementById('answers-block')

//создаем структуру html
        for (let i = 0; i < this.quiz.test.questions.length; i++) {

// Создаем div-элемент с class="test-answers-block-title" и id="title"
            const div = document.createElement("div");
            div.classList.add("test-answers-block-title");
            div.id = "question";
            div.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + this.quiz.test.questions[i].question;

// Добавляем созданный div-элемент в answersBlock
            answersBlock.appendChild(div);

            this.quiz.test.questions[i].answers.forEach(item => {
// создаем div-элемент с class="test-answers-block-options" и id="options"
                const div = document.createElement("div");
                div.classList.add("test-answers-block-options");
                div.id = "options";

// создаем вариант ответа
                const option1 = document.createElement("div");
                option1.classList.add("test-answers-block-option");

// создаем кружок перед ответом

                const circle = document.createElement("div");
                circle.classList.add("test-answers-block-option-circle");
                if (item.correct === true) {
                    circle.classList.add("correct-answer-circle");
                } else if (item.correct === false) {
                    circle.classList.add("wrong-answer-circle");
                }
                option1.appendChild(circle);

// создаем текст для варианта ответа
                const optionText = document.createElement("div");
                optionText.classList.add("test-answers-block-option-text");
                if (item.correct === true) {
                    optionText.classList.add("correct-answer-text");
                } else if (item.correct === false) {
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
        const backToResult = document.getElementById('back-to-results');
        backToResult.onclick = function () {
            window.history.back();
        }
    }
}
