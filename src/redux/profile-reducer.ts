import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api.ts";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    newPostText: 'Привет, тут надо переделать формы',
    profile: null as ProfileType | null,
    status: "",
    updateError: false
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {...state, status: action.status};

        case SET_ERROR_MESSAGE:
            return {...state, updateError: action.updateError};

        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state;
    }
}

type addPostActionCreatorActionType = {type: typeof ADD_POST}
export const addPostActionCreator = (): addPostActionCreatorActionType => ({type: ADD_POST})

type setErrorMessageActionType = {
    type: typeof SET_ERROR_MESSAGE,
    updateError: boolean
}
export const setErrorMessage = (updateError: boolean): setErrorMessageActionType => ({type: SET_ERROR_MESSAGE, updateError})

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type setUserStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setUserStatus = (status: string) : setUserStatusActionType => ({type: SET_STATUS, status})
type updateNewPostTextActionCreatorActionType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string
}
export const updateNewPostTextActionCreator = (text: string): updateNewPostTextActionCreatorActionType => ({type: UPDATE_NEW_POST_TEXT, newText: text})
type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId: number) => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data))
}

export const updateStatus = (status: string) => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }

}

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType, setStatus) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
        dispatch(setErrorMessage(false))
    } else {
        setStatus(data.messages[0]);
        dispatch(setErrorMessage(true)) //не получилось через состояния,
        // т.к. state не сразу меняется и форма закрывается даже с ошибкой
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer;