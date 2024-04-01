import {getAuthUserData} from "./auth-reducer.ts";
import {InferActionsTypes} from "./redux-store";


let initialState = {
    initialized: false
};

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}


export const actions = {
    initializedSuccess: ()=> ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}
type ActionsType = InferActionsTypes<typeof actions>
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}


export default appReducer;