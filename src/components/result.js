import {UrlManager} from "../utils/url-manager.js";

export class Result {

    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        UrlManager.checkResultData(this.routeParams);
        document.getElementById('result-score').innerText = this.routeParams.score + '/'
            + this.routeParams.total;
        let id = this.routeParams.id;
        let answers = this.routeParams.answers;
        let next = document.getElementById('show-answers');
        next.onclick = function () {
            location.href = '#/answers?id=' + id + '&answers=' + answers;
        }
    }
}
