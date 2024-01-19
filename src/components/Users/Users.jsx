import React from "react";
import styles from './Users.module.css'

let Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, photoUrl: 'https://s1.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2019/07/20131130_gaf_rk39_008-467x697.jpg', followed: false, fullName: 'Dmitry N', status: 'I am Iron man', location: {cityName: 'Minsk', country: 'Belarus'}},
            {id: 2, photoUrl: 'https://s1.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2019/07/20131130_gaf_rk39_008-467x697.jpg', followed: true, fullName: 'Bobi G', status: 'I am Iron man', location: {cityName: 'Moscow', country: 'Russia'}},
            {id: 3, photoUrl: 'https://s1.stc.all.kpcdn.net/putevoditel/serialy/wp-content/uploads/2019/07/20131130_gaf_rk39_008-467x697.jpg', followed: true, fullName: 'Jojo R', status: 'I am Big Gun', location: {cityName: 'Moscow', country: 'Russia'}},

        ])
    }

    return <div className={styles.userContainer}>
        {
            props.users.map(u => <div key={u.id} className={styles.oneUser}>
                <div className={styles.userLeft}>
                    <div>
                        <img className={styles.userPhoto} alt={'ava'} src={u.photoUrl} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unFollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>
                        }

                    </div>
                </div>
                <div className={styles.userRight}>
                    <div className={styles.userInfo}>
                        <span>{u.fullName}</span>
                        <span>{u.status}</span>
                    </div>
                    <div className={styles.userLocation}>
                        <span>{u.location.cityName}</span>
                        <span>{u.location.country}</span>
                    </div>
                </div>

            </div>)
        }
    </div>
}

export default Users;