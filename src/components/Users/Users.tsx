import React from "react";
import styles from './Users.module.css'
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {

    return <div className={styles.userContainer}>
        <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                   pageSize={pageSize} onPageChanged={onPageChanged}/>
        {
            users.map(u => <User user={u}
                                 followingInProgress={props.followingInProgress}
                                 unfollow={props.unfollow}
                                 follow={props.follow}
                                 key={u.id}/>
            )
        }

    </div>

}
export default Users;