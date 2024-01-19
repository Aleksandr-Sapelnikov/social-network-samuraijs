import {connect} from "react-redux";
import Users from "./Users"
import {followAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users //userPage береться из redux-store, т.к зарегестрироавли такой редюсер
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId)); //диспачим не экшен креейтор (AC), а результат уго работы, т.е action
        },
        unFollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)