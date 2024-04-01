import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user_icon_149344.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <div className={styles.oneUser}>
        <div className={styles.userLeft}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}
                         alt={'ava'}/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>
                        Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>
                        Follow</button>}

            </div>
        </div>
        <div className={styles.userRight}>
            <div className={styles.userInfo}>
                <span>{user.name}</span>
                <span>{user.status}</span>
            </div>
            <div className={styles.userLocation}>
                <span>{'user.location.cityName'}</span>
                <span>{'user.location.country'}</span>
            </div>
        </div>

    </div>
}

export default User;