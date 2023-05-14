function checkUserData() {
    const url = new URL(location.href);
    const name = url.searchParams.get('name');
    const lastName = url.searchParams.get('lastName');
    const email = url.searchParams.get('email');
    if (!name || !lastName || !email) {
        location.href = 'index.html';
    }
}


function checkAnswersData() {
    const url = new URL(location.href);
    const testId = url.searchParams.get('id');
    const userAnswersString = url.searchParams.get('answers');
    if (!testId || !userAnswersString) {
        location.href = 'index.html';
    }
}