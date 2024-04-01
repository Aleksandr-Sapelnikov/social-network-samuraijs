import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api.ts";
import {authAPI} from "../api/auth-api.ts";
import {securityAPI} from "../api/security-api.ts";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // если null, то капча не обязательна
};


const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch(action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth} } as const),
    getCaptchaUrlSuccess: (captchaUrl) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const)
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    //промисы возвращают промисы, then возвращает промис, если пишем return, то вернет наружу (см. в app-reducer)
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string, setStatus, setSubmitting): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
                setStatus(data.messages)
                setSubmitting(false)
            }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }

}

export default authReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>