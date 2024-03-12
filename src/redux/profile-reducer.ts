import {profileAPI, usersAPI} from "../api/api";
import {photosType, postType, profileType} from "../types/types";

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
    ] as Array<postType>,
    newPostText: 'Привет, тут надо переделать формы',
    profile: null as profileType | null,
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
    profile: profileType
}
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
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
    photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    })
}

export const getStatus = (userId: number) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setUserStatus(response.data));
    })
}

export const updateStatus = (status: string) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status));
            }
        });
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: profileType, setStatus) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
        dispatch(setErrorMessage(false))
    } else {
        setStatus(response.data.messages[0]);
        dispatch(setErrorMessage(true)) //не получилось через состояния,
        // т.к. state не сразу меняется и форма закрывается даже с ошибкой
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;