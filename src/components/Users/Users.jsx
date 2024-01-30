import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user_icon_149344.png'
import {NavLink} from "react-router-dom";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 3;
    let slicedPages = pages.slice(curPF, curPL);

    return <div className={styles.userContainer}>
        <div>
            {slicedPages.map(p => {
                return <span key={p.id}
                             className={props.currentPage === p && styles.selectedPage} // {true && что-то} = вернет что-то, если слева true
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>

            })}
        </div>
        {
            props.users.map(u => <div key={u.id} className={styles.oneUser}>
                <div className={styles.userLeft}>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={'ava'}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>
                        }

                    </div>
                </div>
                <div className={styles.userRight}>
                    <div className={styles.userInfo}>
                        <span>{u.name}</span>
                        <span>{u.status}</span>
                    </div>
                    <div className={styles.userLocation}>
                        <span>{'u.location.cityName'}</span>
                        <span>{'u.location.country'}</span>
                    </div>
                </div>

            </div>)
        }
    </div>
}

export default Users;