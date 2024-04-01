import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";


const setActiveClass = ({isActive}) => isActive ? s.activeLink : "";

const Navbar: React.FC = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" className={setActiveClass}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" className={setActiveClass}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" className={setActiveClass}>Users</NavLink>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
        </nav>
    )
}

export default Navbar;