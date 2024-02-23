import React from "react";
import styles from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {

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