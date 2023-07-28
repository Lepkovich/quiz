
//сервис для создания http-запроса на сервер (backend)
// принимаем 3 параметра: url, method (по умолчанию GET) и body (по умолчанию null)

import {Auth} from "./auth";

export class CustomHttp {
    public static async request(url:string, method:string = "GET", body: any =  null): Promise<any> {
        const params: any = { //это стандартные параметры нашего запроса
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        };

        let token: string | null = localStorage.getItem(Auth.accessTokenKey);
        if (token) {
            params.headers['x-access-token'] = token;
        }

        if (body) { //если POST запрос и в нем есть body
            params.body = JSON.stringify(body);
        }

        const response: Response = await fetch(url, params); //получаем ответ от сервера
        // ловим ошибку ответа сервера
        if (response.status < 200 || response.status >= 300) {
            if (response.status === 401) { //если ответ сервера unauthorized
                const result: boolean = await Auth.processUnauthorizedResponse();
                if (result) {
                    return await this.request(url, method, body); //рекурсия. чтобы понять, пройтись дебагом
                }
                else {
                    return null;
                }
            }
            throw new Error(response.statusText)
        }

        return  await response.json(); //возвращаем ответ сервера
    }
}