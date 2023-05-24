export class Answers {
    constructor() {
        checkAnswersData();
        const url = new URL(location.href);
        const testId = url.searchParams.get('id');
        const userAnswersString = url.searchParams.get('answers');
        const userAnswers = userAnswersString.split(',').map(Number);

//с backend запрашиваем ответы на вопросы
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
        xhr.send();
        if (xhr.status === 200 && xhr.responseText) {
            try {
              this.rightAnswers = JSON.parse(xhr.responseText); // поставил тут this, без него ошибка
            } catch (e) {
                location.href = 'index.html';
            }
        } else {
            location.href = 'index.html';
        }

//с backend запрашиваем наш quiz с вариантами ответов
        xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
        xhr.send();
        if (xhr.status === 200 && xhr.responseText) {
            try {
                this.quiz = JSON.parse(xhr.responseText);
            } catch (e) {
                location.href = 'index.html';
            }
            this.showQuestions(userAnswers, rightAnswers);
        } else {
            location.href = 'index.html';
        }
    }

    showQuestions(userAnswers, rightAnswers) {
        document.getElementById('pre-title').innerText = this.quiz.name;
        const answersBlock = document.getElementById('answers-block')


//создаем структуру html
        for (let i = 0; i < this.quiz.questions.length; i++) {
// проверим на совпадение userAnswer с rightAnswer
            let isAnswerCorrect = true;
            if (userAnswers[i] !== rightAnswers[i]) {
                isAnswerCorrect = false;
            } else {
            }
// Создаем div-элемент с class="test-answers-block-title" и id="title"
            const div = document.createElement("div");
            div.classList.add("test-answers-block-title");
            div.id = "question";
            div.innerHTML = '<span>Вопрос ' + (i + 1) + ':</span> ' + this.quiz.questions[i].question;

// Добавляем созданный div-элемент в answersBlock
            answersBlock.appendChild(div);

            this.quiz.questions[i].answers.forEach(item => {
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
                if (isAnswerCorrect && item.id === rightAnswers[i]) {
                    circle.classList.add("correct-answer-circle");
                } else if (item.id === userAnswers[i]) {
                    circle.classList.add("wrong-answer-circle");
                }
                option1.appendChild(circle);

// создаем текст для варианта ответа
                const optionText = document.createElement("div");
                optionText.classList.add("test-answers-block-option-text");
                if (isAnswerCorrect && item.id === rightAnswers[i]) {
                    optionText.classList.add("correct-answer-text");
                } else if (item.id === userAnswers[i]) {
                    optionText.classList.add("wrong-answer-text");
                }
                optionText.innerText = item.answer + ' id:' + item.id;
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
