const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

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

const dialogsReducer = (state = initialState, action): initialStateType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return  {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
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
type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
}
export const sendMessageCreator = (): sendMessageCreatorActionType => ({type: SEND_MESSAGE})
type updateNewMessageBodyCreatorActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY,
    body: string
}
export const updateNewMessageBodyCreator = (body): updateNewMessageBodyCreatorActionType =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })

export default dialogsReducer;