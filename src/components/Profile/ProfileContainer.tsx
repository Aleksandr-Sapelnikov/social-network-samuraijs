import React from "react";
import Profile from "./Profile.tsx";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer.ts";
import {Navigate, useParams} from 'react-router-dom'
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    match: {}
}

// withRouter отсутствует в react router 6, поэтому есть такой кастыль
export function withRouter(Children: React.ComponentType){
    return(props)=>{

        const match  = {params: useParams()};

        return <Children {...props}  match = {match} />
    }
}

class ProfileContainer extends React.Component<MapPropsType & DispatchPropsType, DispatchPropsType> {

    refreshProfile() {
        let userId: number | null = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
        // if (userId) {
        //     // this.props.history.push("/login");
        //     this.props.getUserProfile(userId)
        //     this.props.getStatus(userId)
        //     //Делаю запросы, только если есть авторизация, иначе ошибка 400 от сервера, т.к. userId = null
        // }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId ) {
            // если id не равны, то прошлый раз показали другого пользователя и надо перерисовать
            this.refreshProfile();
        }
    }

    render() {
        if (!this.props.authorizedUserId) {
            return <Navigate to={"/login"} />
        }
        return (

            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}//если нет id, то я owner
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         updateError={this.props.updateError}
                         savePhoto={this.props.savePhoto}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        updateError: state.profilePage.updateError
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer) as React.ComponentType;