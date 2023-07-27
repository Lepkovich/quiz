import config from "../../config/config";
import {UserInfoType} from "../types/user-info.type";
import {RefreshResponseType} from "../types/refresh-response.type";
import {LogoutResponseType} from "../types/logout-response.type";

export class Auth {

    public static accessTokenKey: string = 'accessToken';
    private static refreshTokenKey: string = 'refreshToken';
    private static userInfoKey: string = 'userInfo';
    private static userEmail: string = 'userEmail'


    public static async processUnauthorizedResponse(): Promise<boolean> {
        const refreshToken: string | null =  localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response: Response = await fetch(config.host + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })
            if (response && response.status === 200) {
                const result: RefreshResponseType | null = await response.json();
                if (result && !result.error && result.accessToken && result.refreshToken ) {
                    this.setTokens(result.accessToken, result.refreshToken);
                    return true;
                }
            }
        }

        this.removeTokens(); //если запрос с ошибкой, удалим токены
        location.href = '#/'; //и отправлять на главную
        return false;
    }

    public static async logOut():Promise<boolean> {
        const refreshToken: string | null =  localStorage.getItem(this.refreshTokenKey);
        if (refreshToken) {
            const response: Response = await fetch(config.host + '/logout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })
            if (response && response.status === 200) {
                const result: LogoutResponseType | any = await response.json();
                if (result && !result.error) {
                    Auth.removeTokens();
                    localStorage.removeItem(this.userInfoKey);
                    return true;
                }
            }
        }
        return false;
    }

    public static setTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.accessTokenKey, accessToken)
        localStorage.setItem(this.refreshTokenKey, refreshToken)
    }

    private static removeTokens(): void {
        localStorage.removeItem(this.accessTokenKey)
        localStorage.removeItem(this.refreshTokenKey)
    }

    public static setUserInfo(info: UserInfoType): void {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info)); //хранить объект в localStorage нельзя, поэтому преобразуем пользователя в строку
    }

    public static getUserInfo(): UserInfoType | null {
        const userInfo: string | null = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }
    public static setUserEmail(email: string | null): void { // дописывал сам
        if (email) {
            localStorage.setItem(this.userEmail, email);
        } else {
            localStorage.setItem(this.userEmail, 'none'); //если email не пришел, запишем в localStorage 'none'
        }
    }
    public static getUserEmail(): string | null { // дописывал сам
        const userEmail = localStorage.getItem(this.userEmail);
        if (userEmail) {
            return userEmail;
        }
        return null;
    }
}