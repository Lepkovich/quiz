import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {QueryParamsType} from "../types/query-params.type";
import {QuizType} from "../types/quiz.type";
import {UserResultType} from "../types/user-result.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Test {
    private progressBarElement: HTMLElement | null;
    private questionTitleElement: HTMLElement | null;
    private nextButtonElement: HTMLElement | null;
    private passButtonElement: HTMLElement | null;
    private prevButtonElement: HTMLElement | null;
    private optionsElement: HTMLElement | null;
    private quiz: QuizType | null;
    private currentQuestionIndex: number;
    readonly userResult: UserResultType[];
    private routeParams: QueryParamsType;


    constructor() {
        this.quiz = null;
        this.progressBarElement = null;
        this.questionTitleElement = null;
        this.nextButtonElement = null;
        this.passButtonElement = null;
        this.prevButtonElement = null;
        this.optionsElement = null;
        this.currentQuestionIndex = 1;
        this.userResult = [];
        this.routeParams = UrlManager.getQueryParams();
        this.init();

    }

    private async init(): Promise<void> {
        if (this.routeParams.id) {
            try {
                const result: DefaultResponseType | QuizType = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id);

                if (result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    this.quiz = result as QuizType;
                    this.startQuiz();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    private startQuiz(): void {

        this.progressBarElement = document.getElementById('progress-bar');

        this.questionTitleElement = document.getElementById('question-title');
        this.optionsElement = document.getElementById('options');

        this.nextButtonElement = document.getElementById('next');
        this.nextButtonElement.onclick = this.move.bind(this, 'next');

        this.passButtonElement = document.getElementById('pass');
        this.passButtonElement.onclick = this.move.bind(this, 'pass');

        this.prevButtonElement = document.getElementById('prev');
        this.prevButtonElement.onclick = this.move.bind(this, 'prev');

        document.getElementById('pre-title').innerText = this.quiz.name;

        this.prepareProgressBar();
        this.showQuestion();

        const timerElement = document.getElementById('timer');
        let seconds = 6000;
        this.interval = setInterval(function () {
            seconds--;
            timerElement.innerText = seconds;
            if (seconds === 0) {
                clearInterval(this.interval);
                this.complete();
            }
        }.bind(this), 1000);
    }

    prepareProgressBar() {
        // создаем структуру html документа "test-progress-bar"
        for (let i = 0; i < this.quiz.questions.length; i++) {
            const itemElement = document.createElement('div');
            itemElement.className = 'test-progress-bar-item' + (i === 0 ? ' active' : '');

            const itemCircleElement = document.createElement('div');
            itemCircleElement.className = 'test-progress-bar-item-circle';

            const itemTextElement = document.createElement('div');
            itemTextElement.className = 'test-progress-bar-item-text';
            itemTextElement.innerText = 'Вопрос ' + (i + 1);

            itemElement.appendChild(itemCircleElement);
            itemElement.appendChild(itemTextElement);
            this.progressBarElement.appendChild(itemElement);

        }

    }

    showQuestion() {
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
            + ':</span> ' + activeQuestion.question;
        this.optionsElement.innerHTML = ''; //удалим текущие ответы
        const that = this;
        const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id); //чтобы отрисовать сделанный ранее пользователем выбор radio, ищем есть в массиве этот выбор
        //и размещаем структуру html с вариантами ответов
        activeQuestion.answers.forEach(answer => {
//создаем строку <div class="test-question-option">
            const optionElement = document.createElement('div');
            optionElement.className = 'test-question-option';
//создаем строку <input type="radio" id="answer-one" name="answer">
            const inputId = 'answer-' + answer.id
            const inputElement = document.createElement('input');
            inputElement.className = 'option-answer';
            inputElement.setAttribute('id', inputId);
            inputElement.setAttribute('type', 'radio');
            inputElement.setAttribute('name', 'answer');
            inputElement.setAttribute('value', answer.id);
            if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                inputElement.setAttribute('checked', 'checked');
            }


            inputElement.onchange = function () {
                that.chooseAnswer();
            }

//создаем строку <label for="answer-one">Вариант ответа 1 </label>
            const labelElement = document.createElement('label');
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
            this.optionsElement.appendChild(optionElement);

        });
        if (chosenOption && chosenOption.chosenAnswerId) {
            this.nextButtonElement.removeAttribute('disabled');
        } else {
            this.nextButtonElement.setAttribute('disabled', 'disabled');
        }
        if (this.currentQuestionIndex === this.quiz.questions.length) {
            this.nextButtonElement.innerText = 'Завершить';
        } else {
            this.nextButtonElement.innerText = 'Далее';
        }
        if (this.currentQuestionIndex > 1) {
            this.prevButtonElement.removeAttribute('disabled');
        } else {
            this.prevButtonElement.setAttribute('disabled', 'disabled');
        }
    }

    chooseAnswer() {
        this.nextButtonElement.removeAttribute('disabled');
    }

    move(action) {
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {
            return element.checked;
        })
        let chosenAnswerId = null;
        if (chosenAnswer && chosenAnswer.value) {
            chosenAnswerId = Number(chosenAnswer.value);
        }

        const existingResult = this.userResult.find(item => {
            return item.questionId === activeQuestion.id
        });
        if (existingResult) {
            existingResult.chosenAnswerId = chosenAnswerId;
        } else {
            this.userResult.push({
                questionId: activeQuestion.id,
                chosenAnswerId: chosenAnswerId
            });
        }


        if (action === 'next' || action === 'pass') {
            this.currentQuestionIndex++;
        } else {
            this.currentQuestionIndex--;
        }

        if (this.currentQuestionIndex > this.quiz.questions.length) {
            clearInterval(this.interval);
            this.complete();
            return;
        }

        Array.from(this.progressBarElement.children).forEach((item, index) => {
            const currentItemIndex = index + 1;
            item.classList.remove('complete');
            item.classList.remove('active');
            if (currentItemIndex === this.currentQuestionIndex) {
                item.classList.add('active');
            } else if (currentItemIndex < this.currentQuestionIndex) {
                item.classList.add('complete');
            }
        })

        this.showQuestion();
    }

    async complete() {
        const userInfo = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        if(!userInfo) {
             location.href = '#/'
        }

        try {
            const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/pass', 'POST',
                {
                    userId: userInfo.userId,
                    results: this.userResult
                })

            if(result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                location.href = '#/result?id=' + this.routeParams.id;
            }
        } catch (error) {
            console.log(error);
        }

        //старый доделанный в КР код
        /*const userAnswers = this.userResult.map(item => item.chosenAnswerId);
        const userAnswersString = userAnswers.join(',');
        location.href = '#/result?score=' + result.score + '&total=' + result.total + '&id=' + this.routeParams.id + '&answers=' + userAnswersString;
        */
    }
}