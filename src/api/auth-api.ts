import {APIResponseType, instance, ResultCodeForCaptcha, ResultCodesEnum} from "./api.ts";


type MeResponseDateType = {
    id: number
    email: string
    login: string

}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDateType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}