(function () {
    const Answers = {
        init() {
            // checkUserData();
            // const url = new URL(location.href);
            // const testId = url.searchParams.get('id');
//сначала выведем наши вопросы
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=2', false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e){
                        // location.href = 'index.html';
                        console.log('мы в catch');
                    }
                    this.showQuestions();
                } else {
                    // location.href = 'index.html';
                    console.log('мы в первом else');
                }
        },
        showQuestions() {
            console.log(this.quiz);
//достаем название теста по id (1,2,3) в поле name
            console.log(this.quiz.name)
            document.getElementById('pre-title').innerText = this.quiz.name;
            const questionTitle = document.getElementById('title')
//создаем структуру html
//             <div className="test-answers-block-title" id="title">
//                 <span>Вопрос 1:</span> Тут должен быть текст вопроса
//             </div>
            console.log('Наши вопросы:')

            for (let a = 0; a < this.quiz.questions.length; a++) {
                console.log(this.quiz.questions[a].question);
                // this.quiz.questions[a].answers.forEach(item => {
                //     console.log(item.answer);
                // });
            }

            console.log('Варианты ответов:')

//меняем название теста по id (1,2,3) в поле name

            document.getElementById('pre-title').innerText = this.quiz.name;
            const answersBlock = document.getElementById('answers-block')
//создаем структуру html
//             <div className="test-answers-block-title" id="title">
//                 <span>Вопрос 1:</span> Тут должен быть текст вопроса
//             </div>

            for (let i=0; i < this.quiz.questions.length; i++) {
// Создаем div-элемент с классом "test-answers-block-title" и идентификатором "title"
                const div = document.createElement("div");
                div.classList.add("test-answers-block-title");
                div.id = "question";
                div.innerHTML = '<span>Вопрос ' + (i+1) + ':</span> ' + this.quiz.questions[i].question;

// Добавляем созданный div-элемент в документ
                answersBlock.appendChild(div);

                this.quiz.questions[i].answers.forEach(item => {
                    console.log(item.answer);
                    // создаем div-элемент
                    const div = document.createElement("div");
                    div.classList.add("test-answers-block-options");
                    div.id = "options";

// создаем первый вариант ответа
                    const option1 = document.createElement("div");
                    option1.classList.add("test-answers-block-option");

// создаем кружок для отображения правильного ответа
                    const circle = document.createElement("div");
                    circle.classList.add("test-answers-block-option-circle");
                    circle.classList.add("correct-answer");
                    option1.appendChild(circle);

// создаем текст для первого варианта ответа
                    const optionText = document.createElement("div");
                    optionText.classList.add("test-answers-block-option-text");
                    optionText.innerText = item.answer;
                    option1.appendChild(optionText);

// добавляем первый вариант ответа в div-элемент
                    div.appendChild(option1);
                    // добавляем div-элемент в документ
                    answersBlock.appendChild(div);
                });
            }
        }
    }
    Answers.init();
})();
