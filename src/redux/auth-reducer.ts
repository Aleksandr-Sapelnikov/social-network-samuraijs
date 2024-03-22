import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api.ts";
import {authAPI} from "../api/auth-api.ts";
import {securityAPI} from "../api/security-api.ts";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // если null, то капча не обязательна
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action): initialStateType => {
    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}
type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}


type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        {userId, email, login, isAuth}  });

type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
    //промисы возвращают промисы, then возвращает промис, если пишем return, то вернет наружу (см. в app-reducer)
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string, setStatus, setSubmitting) => async (dispatch) => {
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

export const getCaptchaUrl = () => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
}

export default authReducer;