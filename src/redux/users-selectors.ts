//варианты селекторов (при фильтрации создается новый массив, что приводит к перерисовке, селектор помогает избежать этого)

import {createSelector} from "reselect";
import { AppStateType } from "./redux-store.ts";
import {UserType} from "../types/types";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector,
    (users: Array<UserType>) => {
        return users.filter(u => true);
    })

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
}

export const countSomethingDifficult = (state: AppStateType) => {
    debugger
    //for... math... big arrays
    let count = 23;
    return count;
}