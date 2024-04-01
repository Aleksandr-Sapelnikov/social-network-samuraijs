import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api.ts";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


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


const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST":
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
        case "SN/PROFILE/UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newText
            };
        case "SN/PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile};

        case "SN/PROFILE/SET_STATUS":
            return {...state, status: action.status};

        case "SN/PROFILE/SET_ERROR_MESSAGE":
            return {...state, updateError: action.updateError};

        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state;
    }
}


export const actions = {
    addPostActionCreator: () => ({type: 'SN/PROFILE/ADD-POST'} as const),
    setErrorMessage: (updateError: boolean)=> ({type: 'SN/PROFILE/SET_ERROR_MESSAGE', updateError} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    updateNewPostTextActionCreator: (text: string) => ({type: 'SN/PROFILE/UPDATE-NEW-POST-TEXT', newText: text} as const),
    savePhotoSuccess: (photos: PhotosType)=> ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
        dispatch(actions.setUserStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setUserStatus(status));
    }

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType, setStatus) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
        dispatch(actions.setErrorMessage(false))
    } else {
        setStatus(data.messages[0]);
        dispatch(actions.setErrorMessage(true)) //не получилось через состояния,
        // т.к. state не сразу меняется и форма закрывается даже с ошибкой
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer;

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>