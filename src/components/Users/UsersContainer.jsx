import {connect} from "react-redux";
import Users from "./Users"
import {
    follow, getUsers,
    setCurrentPage,
    toggleFollowingInProgress,
    unfollow
} from "../../redux/users-reducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";



class UsersContainer extends React.Component {

    componentDidMount() { // (вмантирование), метод, где нужно делать все side эффекты
        this.props.getUsers(this.props.currentPage, this.props.pageSize); //сюда попадает колбэк,
        // который внутри себя вызывает thunk и диспачит результат
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users, //userPage береться из redux-store, т.к зарегестрироавли такой редюсер
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch) => { //записываем колбэки, которые попадут в пропсы
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId)); //диспачим не экшен креейтор (AC), а результат его работы, т.е action
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         },
//     }
// }

// " ...если вы передаете в connect вторым аргументом не mapDispatchToProps, а объект с AC,
// то connect оборачивает ваши AC в функцию-обертку () => store.dispatch(AC) и передаёт в props компонента."
export default connect(mapStateToProps,
    {follow, unfollow, setCurrentPage,
        toggleFollowingInProgress, getUsers})(UsersContainer)