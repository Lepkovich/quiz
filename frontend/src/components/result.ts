import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {QueryParamsType} from "../types/query-params.type";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";
import {PassTestResponseType} from "../types/pass-test-response.type";

export class Result {
    private routeParams: QueryParamsType;
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

    private async init(): Promise<void> {
        const userInfo: UserInfoType | null = Auth.getUserInfo(); //берем из localStorage информацию о пользователе
        if(!userInfo){
            location.href = '#/';
            return;
        }
        if(this.routeParams.id) {
            try {
                const result: DefaultResponseType | PassTestResponseType = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId);

                if(result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    const resultScoreElement: HTMLElement | null = document.getElementById('result-score');
                    if (resultScoreElement) {
                        resultScoreElement.innerText = (result as PassTestResponseType).score + '/' + (result as PassTestResponseType).total;
                    }
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
        location.href = '#/';
    }
}
