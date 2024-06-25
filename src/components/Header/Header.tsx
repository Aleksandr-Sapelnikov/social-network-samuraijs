import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors.ts";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {logout} from "../../redux/auth-reducer.ts";
import {UserOutlined} from "@ant-design/icons";
import {AppDispatch} from "../../redux/redux-store";

export type MapPropsType = {}
export type DispatchPropsType = {}

const Header: React.FC<MapPropsType & DispatchPropsType> = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: AppDispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const items1: MenuItem[] = [
        {
            key: 'sub1',
            label: <Link to="/developers">Developers</Link>,
        }]

    const {Header} = Layout

    return <Header style={{display: 'grid', alignItems: 'center'}}>
        <Row>
            <Col span={18}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items1}
                    style={{flex: 1, minWidth: 0}}
                />
            </Col>
            {isAuth
                ? <>
                    <Col span={2}>
                        <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                    <Col span={4}>
                        <Button onClick={logoutCallback}>Log out</Button>
                    </Col>
                </>
                : <Col span={6}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>}
        </Row>

    </Header>

    // return <header className={s.header}>
    //     <img
    //         src='https://img.freepik.com/free-vector/flat-design-atheism-logo-template_23-2149248384.jpg?w=1380&t=st=1704185422~exp=1704186022~hmac=9599356f0cad84ef8b1fc7b19fbd4b5dc6a20c6873cdd02e3dbe03c8194ab361'
    //         alt={'logo'}/>
    //     <div className={s.loginBlock}>
    //         { props.isAuth
    //             ? <div>{props.login}  <button onClick={props.logout}>Log out</button> </div>
    //             : <NavLink to={'/login'}>Login</NavLink> }
    //     </div>
    // </header>
}

export default Header;