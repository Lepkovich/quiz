
//сервис для создания http-запроса на сервер (backend)
// принимаем 3 параметра: url, method (по умолчанию GET) и body (по умолчанию null)

import {Auth} from "./auth.js";

export class CustomHttp {
    static async request(url, method = "GET", body =  null) {
        const params = { //это стандартные параметры нашего запроса
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        };

        let token = localStorage.getItem(Auth.accessTokenKey);
        if (token) {
            params.headers['x-access-token'] = token;
        }

        if (body) { //если POST запрос и в нем есть body
            params.body = JSON.stringify(body);
        }

        const response = await fetch(url, params); //получаем ответ от сервера
        // ловим ошибку ответа сервера
        if (response.status < 200 && response.status >= 300) {
            if (response.status === 401) { //если ответ сервера unauthorized
                const result = await Auth.processUnauthorizedResponse();
                if (result) {
                    return await this.request(url, method, body); //рекурсия. чтобы понять, пройтись дебагом
                }
                else {
                    return null;
                }
            }
            throw new Error(response.message)
        }

        return  await response.json(); //возвращаем ответ сервера
    }
}