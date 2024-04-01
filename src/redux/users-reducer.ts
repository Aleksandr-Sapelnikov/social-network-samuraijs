import {updateObjectInArray} from "../utils/object-helper.ts";
import {UserType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api.ts";
import {APIResponseType} from "../api/api";

// const FOLLOW = 'SN/USERS/FOLLOW';
// const UNFOLLOW = 'SN/USERS/UNFOLLOW';
// const SET_USERS = 'SN/USERS/SET_USERS';
// const SET_CURRENT_PAGE = 'SN/USERS/SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SN/USERS/SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'SN/USERS/TOGGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS';


export let InitialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
};


const usersReducer = (state = InitialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
            }
        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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


export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const), // currentPage: currentPage
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}


//Thunk Creator (либо action санки - там где диспач) принимает 3 параметра, dispatch, seState, extraArguments

//type ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction extends Action> =
// (dispatch: ThunkDispatch<State, ExtraThunkArg, BasicAction>, getState: () => State, extraArgument: ExtraThunkArg) => ReturnType;
//ThunkCreator
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true)) // показывает значек загрузки
        dispatch(actions.setCurrentPage(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));


    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
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

type initialStateType = typeof InitialState
type ThunkType = BaseThunkType<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>