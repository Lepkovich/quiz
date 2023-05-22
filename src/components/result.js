export class Result {

    constructor() {
        checkAnswersData();
        const url = new URL(location.href);
        const answers = url.searchParams.get('answers');
        const testId = url.searchParams.get('id')
        document.getElementById('result-score').innerText = url.searchParams.get('score') + '/'
            + url.searchParams.get('total');
        let next = document.getElementById('show-answers');
        next.onclick = function () {
            location.href = 'answers.html?id=' + testId + '&answers=' + answers;
        }
    }
}
