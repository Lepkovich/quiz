import {UrlManager} from "../utils/url-manager.ts";
import {CustomHttp} from "../services/custom-http.ts";
import config from "../../config/config";
import {Auth} from "../services/auth.ts";

export class Result {

    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        // UrlManager.checkResultData(this.routeParams);
        // document.getElementById('result-score').innerText = this.routeParams.score + '/' + this.routeParams.total;
        let id = this.routeParams.id;
        let next = document.getElementById('show-answers');
        next.onclick = function () {
            location.href = '#/answers?id=' + id;
        }
        this.init();

    }

    async init() {
        const userInfo = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        if(!userInfo){
            location.href = '#/';
        }
        if(this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId);

                if(result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    document.getElementById('result-score').innerText = result.score + '/' + result.total;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
        location.href = '#/';
    }
}
