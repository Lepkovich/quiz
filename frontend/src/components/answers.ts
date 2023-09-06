import {UrlManager} from "../utils/url-manager";
import {Auth} from "../services/auth";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {QuizResultType, QuizType} from "../types/quiz.type";
import {QueryParamsType} from "../types/query-params.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Answers {

    private quiz: QuizType | QuizResultType | null;
    private routeParams: QueryParamsType;
    private userData: string | null;
    constructor() {
        this.quiz = null;
        this.routeParams = UrlManager.getQueryParams();
        this.userData = null;
        this.init();

    }
    private async init(): Promise<void> {
        const userInfo  = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        const userEmail = Auth.getUserEmail(); //берем из localStorage email
        if(!userInfo || !userEmail){
            location.href = '#/';
        } else {
            if (userInfo.fullName) {
                this.userData as string = userInfo.fullName  + ', ' + userEmail;
            }

            if(this.routeParams.id) {
                try {
                    if (userInfo.userId) {
                        const result: DefaultResponseType | QuizResultType  = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);
                        // /api/tests/:id/result/details?userId=:userId
                        if(result) {
                            if ((result as DefaultResponseType).error) {
                                throw new Error((result as DefaultResponseType).message as string);
                            }
                            this.quiz = result as QuizResultType;
                            this.showQuestions();
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    private showQuestions(): void {

        if (!this.quiz) return;

        if ('test' in this.quiz) {
            const quizResult = this.quiz as QuizResultType;
            if (quizResult.test.name) {
                document.getElementById('pre-title').innerText = quizResult.test.name as string;
            }
            if (this.userData) {
                document.getElementById('user').querySelector('span').textContent = this.userData as string;
            }

            const answersBlock: HTMLElement | null = document.getElementById('answers-block')

//создаем структуру html
            for (let i = 0; i < quizResult.test.questions.length; i++) {

// Создаем div-элемент с class="test-answers-block-title" и id="title"
                const div = document.createElement("div");
                div.classList.add("test-answers-block-title");
                div.id = "question";
                div.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + quizResult.test.questions[i].question;

// Добавляем созданный div-элемент в answersBlock
                answersBlock.appendChild(div);

                quizResult.test.questions[i].answers.forEach(item => {
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

        }

        const backToResult = document.getElementById('back-to-results');
        backToResult.onclick = function () {
            window.history.back();
        }
    }
}
