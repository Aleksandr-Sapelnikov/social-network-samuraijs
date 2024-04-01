import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return <header className={s.header}>
        <img
            src='https://img.freepik.com/free-vector/flat-design-atheism-logo-template_23-2149248384.jpg?w=1380&t=st=1704185422~exp=1704186022~hmac=9599356f0cad84ef8b1fc7b19fbd4b5dc6a20c6873cdd02e3dbe03c8194ab361'
            alt={'logo'}/>
        <div className={s.loginBlock}>
            { props.isAuth
                ? <div>{props.login}  <button onClick={props.logout}>Log out</button> </div>
                : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;