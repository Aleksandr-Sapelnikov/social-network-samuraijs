import {InferActionsTypes} from "./redux-store";


type dialogType = {
    id: number,
    name: string
}
type messageType = {
    id: number,
    message: string
}
let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<dialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<messageType>,
    newMessageBody: ""
};

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/UPDATE_NEW_MESSAGE_BODY':
            return  {
                ...state,
                newMessageBody: action.body
            };
        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const actions = {
    sendMessage: () => ({type: 'SN/DIALOGS/SEND_MESSAGE'} as const),
    updateNewMessageBody: (body) => ({ type: 'SN/DIALOGS/UPDATE_NEW_MESSAGE_BODY', body: body } as const)
}

export default dialogsReducer;