import React from "react";
import styles from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/images/user_icon_149344.png'

class Users extends React.Component {

    constructor(props) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items);
        })
    }

    // getUsers = () => {
    //     if (this.props.users.length === 0) {
    //         axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
    //             this.props.setUsers(response.data.items);
    //         })
    //     }
    // }

    render() {
        return <div className={styles.userContainer}>
            {
                this.props.users.map(u => <div key={u.id} className={styles.oneUser}>
                    <div className={styles.userLeft}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto } className={styles.userPhoto} alt={'ava'} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unFollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
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
}

export default Users;