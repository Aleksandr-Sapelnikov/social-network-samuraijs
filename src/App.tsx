import React, {lazy} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';
import {Route, Routes, useParams} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
// import LoginPage from "./components/Login/Login";
import Preloader from "./components/common/Preloader/Preloader.tsx";

import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import {AppStateType} from "./redux/redux-store";

const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer.tsx"));
const UsersContainer = lazy(() => import("./components/Users/UsersContainer.tsx"));
// const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer.tsx"));
const LoginPage = lazy(() => import("./components/Login/Login.tsx"));


// withRouter отсутствует в react router 6, поэтому есть такой кастыль
export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}


class App extends React.Component<MapPropsType & DispatchPropsType, any> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <React.Suspense fallback={<Preloader/>}>
                    <Routes>
                        <Route path='/dialogs' element={<DialogsContainer/>}/>
                        <Route path="/profile/:userId" element={<ProfileContainer />} />
                        <Route path="/profile" element={<ProfileContainer />} />
                        {/*<Route path="/profile" element={<ProfileContainer/>}>*/}
                        {/*    <Route path=":userId" element={<ProfileContainer/>}/>*/}
                        {/*</Route>*/}

                        <Route path='/users' element={<UsersContainer/>}/>

                        <Route path='/login' element={<LoginPage/>}/>
                    </Routes>
                    </React.Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);