import axios from "axios";

// Слой доступа к данным (Data Access Layer — DAL)
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '4f64d693-b6e4-46e0-97bc-f37487efebac'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data; // цепочка промисов, возвращаем дату, чтобы не было лишнего UI компоненте
        });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    }

};

export const authAPI = {
    me() {
        return instance.get('auth/me')
    }
}