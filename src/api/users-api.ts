//headers: {'API-KEY': '4f64d693-b6e4-46e0-97bc-f37487efebac'}
import {APIResponseType, GetItemsType, instance} from "./api.ts";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(res => res.data) // цепочка промисов, возвращаем дату, чтобы не было лишнего UI компоненте
    },
    follow(userId) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    },
    // getProfile(userId) {
    //     console.warn('Obsolete method. Please profileAPI object.')
    //     return profileAPI.getProfile(userId);
    // }
}