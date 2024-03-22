// Слой доступа к данным (Data Access Layer — DAL)

import axios from "axios";
import {UserType} from "../types/types";

// @ts-ignore
//не могу понять что не работает (тип headers не проходит), ответа нигде нету, поэтому остается тс игнор
// @ts-ignore
export const instance = axios.create( {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '4f64d693-b6e4-46e0-97bc-f37487efebac'}
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}