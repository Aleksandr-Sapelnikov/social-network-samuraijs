import React, {lazy} from 'react';
import './App.css';
import {NavLink, Route, Routes, useParams} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer.ts";
import {AppStateType} from "./redux/redux-store";
import {UsersPage} from "./components/Users/UsersContainer.tsx";
import {Breadcrumb, Button, Layout, Menu, theme} from "antd";
import {NotificationOutlined, UserOutlined} from '@ant-design/icons';
import Header from "./components/Header/Header.tsx";

const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer.tsx"));
// const UsersPage = lazy(() => import("./components/Users/UsersContainer.tsx"));
// const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer.tsx"));
const LoginPage = lazy(() => import("./components/Login/Login.tsx"));
const ChatPage = lazy(() => import("./pages/Chat/ChatPage.tsx"));


const {Content, Sider} = Layout;


const items2: MenuItem[] = [
    {
        key: 'sub1',
        label: 'My Profile',
        icon: <NotificationOutlined/>,
        children: [
            {key: '1', label: <NavLink to="/profile">Profile</NavLink>},
            {key: '2', label: <NavLink to="/dialogs">Messages</NavLink>},
        ],
    },

    {
        key: 'sub2',
        label: 'Developers',
        icon: <UserOutlined/>,
        children: [
            {key: '3', label: <NavLink to="/developers">Users</NavLink>},
            {key: '4', label: <NavLink to="/Chat">Chat</NavLink>},
        ],
    },
];


// withRouter отсутствует в react router 6, поэтому есть такой кастыль
export function withRouter(Children) {
    return (props) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

// пробою добавить hook из ant как HOC (Это сработоло)
function TokenHook(Component) {
    return function WrappedComponent(props) {
        const {
            token: {colorBgContainer, borderRadiusLG},
        } = theme.useToken();
        return <Component {...props} colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG}/>;
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
        const borderRadiusLG = this.props.borderRadiusLG
        const colorBgContainer = this.props.colorBgContainer

        return (
            <Layout>
                <Header/>
                <Layout>
                    <Sider width={200} style={{background: colorBgContainer}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                            items={items2}

                        />
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <React.Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                                    <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                                    <Route path="/profile" element={<ProfileContainer/>}/>
                                    <Route path="/" element={<ProfileContainer/>}/>
                                    <Route path='/developers' element={<UsersPage pageTitle={"Самураи"}/>}/>
                                    <Route path='/login' element={<LoginPage/>}/>
                                    <Route path='/Chat' element={<ChatPage/>}/>
                                    <Route path='*'
                                           element={<div>404 NOT FOUND <Button type="primary">Button</Button></div>}/>
                                </Routes>
                            </React.Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

            // return (
            //     <div className='app-wrapper'>
            //         <HeaderContainer/>
            //         <Navbar/>
            //         <div className='app-wrapper-content'>
            //             <React.Suspense fallback={<Preloader/>}>
            //             <Routes>
            //                 <Route path='/dialogs' element={<DialogsContainer/>}/>
            //                 <Route path="/profile/:userId" element={<ProfileContainer />} />
            //                 <Route path="/profile" element={<ProfileContainer />} />
            //                 <Route path="/" element={<ProfileContainer />} />
            //                 {/*<Route path="/profile" element={<ProfileContainer/>}>*/}
            //                 {/*    <Route path=":userId" element={<ProfileContainer/>}/>*/}
            //                 {/*</Route>*/}
            //
            //                 <Route path='/users' element={<UsersPage pageTitle={"Самураи"}/>}/>
            //                 <Route path='/login' element={<LoginPage/>}/>
            //                 <Route path='*' element={<div>404 NOT FOUND <Button type="primary">Button</Button></div>}/>
            //             </Routes>
            //             </React.Suspense>
            //         </div>
            //     </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose(
    TokenHook,
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);