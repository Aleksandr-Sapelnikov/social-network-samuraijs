import {actions} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";
import {AppStateType} from "../../redux/redux-store";


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewMessageBody: (body) => {
//             dispatch(actions.updateNewMessageBodyCreator(body))
//         },
//         sendMessage: () => {
//             dispatch(actions.sendMessageCreator())
//         }
//
//     }
// }

//compose конвеер снизу вверх
export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs);