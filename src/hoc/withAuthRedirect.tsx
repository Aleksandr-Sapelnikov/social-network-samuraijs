import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {

    function RedirectComponent(props) {
        if (!props.isAuth) return <Navigate to='/login'/>

        return <WrappedComponent {...props}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);

}