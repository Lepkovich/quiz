import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {QueryParamsType} from "../types/query-params.type";
import {QuizListType} from "../types/quiz-list.type";
import {TestResultType} from "../types/test-result.type";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Choice {
    private quizzes: QuizListType[] = [];
    private testResult: TestResultType[] | null = null;
    private routeParams: QueryParamsType;
    constructor() {
        this.routeParams = UrlManager.getQueryParams();

        this.init();
    }

    private async init(): Promise<void> {
        try {
            this.quizzes = await CustomHttp.request(config.host + '/tests ');
        } catch (error) {
            console.log(error);
            return
        }
        const userInfo: UserInfoType | null = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        if (userInfo) {
            try {
                const result: DefaultResponseType | TestResultType[] = await CustomHttp.request(config.host + '/tests/results?userId=' + userInfo.userId);

                if (result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    this.testResult = result as TestResultType[];
                }
            } catch (error) {
                console.log(error);
                return
            }

        }
        this.processQuizzes();

    }



    private processQuizzes(): void {
        const choiceOptionsElement: HTMLElement | null = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0 && choiceOptionsElement) {
            this.quizzes.forEach((quiz:QuizListType) => {
                const that: Choice = this;
                const choiceOptionElement: HTMLElement | null = document.createElement('div');
                choiceOptionElement.className = 'choice-option';
                choiceOptionElement.setAttribute('data-id', quiz.id.toString())
                // choiceOptionElement.onclick = () => {
                //     this.chooseQuiz(choiceOptionElement); // Передаем choiceOptionElement напрямую, вместо использования 'this' по совету chatGPT
                // };
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(<HTMLElement>this); //утверждение типа (мы уверены, что там HTML)
                }

                const choiceOptionTextElement: HTMLElement | null = document.createElement('div');
                choiceOptionTextElement.className = 'choice-option-text';
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement: HTMLElement | null = document.createElement('div');
                choiceOptionArrowElement.className = 'choice-option-arrow';

                if (this.testResult) { // у Романа в уроке нет проблем с find (по таймингу проходим его до отметки в 1ч
                    const result: TestResultType | undefined = this.testResult.find(item => item.testId === quiz.id);
                    if (result) {
                        const choiceOptionResultElement: HTMLElement | null = document.createElement('div');
                        choiceOptionResultElement.className = 'choice-option-result';
                        choiceOptionResultElement.innerHTML = '<div>Результат</div> <div>' + result.score + '/' + result.total + '</div>';
                        choiceOptionElement.appendChild(choiceOptionResultElement);

                    }
                }


                const choiceOptionImageElement: HTMLElement | null = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', '/images/arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'стрелка');

                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);

                choiceOptionsElement.appendChild(choiceOptionElement);

            })
        }
    }



    private chooseQuiz(element: HTMLElement): void {
        const dataID: string | null = element.getAttribute('data-id')
        if (dataID) {
            location.href = '#/test?id=' + dataID;
        }
    }
}