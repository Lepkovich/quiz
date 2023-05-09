(function () {
    const Test = {
        quiz: null,
        questionTitleElement: null,
        nextButtonElement: null,
        prevButtonElement: null,
        optionsElement: null,
        currentQuestionIndex: 1,
        init() {
            checkUserData();
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e){
                        location.href = 'index.html';
                    }
                    this.startQuiz();
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        startQuiz() {
            console.log(this.quiz);
            this.questionTitleElement = document.getElementById('title');
            this.optionsElement = document.getElementById('options');
            this.nextButtonElement = document.getElementById('next');
            this.prevButtonElement = document.getElementById('prev');
            this.showQuestion();
        },
        showQuestion() {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex -1];
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
                + ':</span> ' + activeQuestion.question;
            this.optionsElement.innerHTML = ''; //удалим текущие ответы
            const that = this;
            //и размещаем структуру html с вариантами ответов
            activeQuestion.answers.forEach(answer => {
//создаем строку <div class="test-question-option">
                const optionElement = document.createElement('div');
                optionElement.className = 'test-question-option';
//создаем строку <input type="radio" id="answer-one" name="answer">
                const inputId = 'answer-' + answer.id
                const inputElement = document.createElement('input');
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id);

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

            })
        },
        chooseAnswer() {
            this.nextButtonElement.removeAttribute('disabled');
        },
        move() {
            //видео 1:21
        }
    }
    Test.init();
})();