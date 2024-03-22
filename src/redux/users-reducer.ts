import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../types/types"
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api.ts";

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
};

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
            }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const), // currentPage: currentPage
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}

type GetStateType = () => AppStateType
//Thunk Creator (либо action санки - там где диспач) принимает 3 параметра, dispatch, seState, extraArguments
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
//type ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction extends Action> =
// (dispatch: ThunkDispatch<State, ExtraThunkArg, BasicAction>, getState: () => State, extraArgument: ExtraThunkArg) => ReturnType;
//ThunkCreator
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true)) // показывает значек загрузки

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setCurrentPage(currentPage));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)

    }
}

export default usersReducer;