import config from "../../config/config.js";

export class Auth {

    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoKey = 'userInfo';


    static async processUnauthorizedResponse() {
        const refreshToken =  localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.host + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })
            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    this.setTokens(result.accessToken, result.refreshToken);
                    return true;
                }
            }
        }

        this.removeTokens(); //если запрос с ошибкой, удалим токены
        location.href = '#/'; //и отправлять на главную
        return false;
    }

    static async logOut(){

    }

    static setTokens(accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken)
        localStorage.setItem(this.refreshTokenKey, refreshToken)
    }
    static removeTokens() {
        localStorage.removeItem(this.accessTokenKey)
        localStorage.removeItem(this.refreshTokenKey)
    }

    static setUserInfo(info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info)); //хранить объект в localStorage нельзя, поэтому преобразуем пользователя в строку
    }

    static getUserInfo() {
        const userInfo = localStorage.getItem(userInfoKey);
        if (userInfo) {
            return JSON.parse(this.userInfoKey);
        }
        return null;

    }
}