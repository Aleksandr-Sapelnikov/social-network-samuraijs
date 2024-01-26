import React from "react";
import styles from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/images/user_icon_149344.png'

class Users extends React.Component {

    componentDidMount() { // (вмантирование), метод, где нужно делать все side эффекты
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
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

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let curP = this.props.currentPage;
        let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
        let curPL = curP + 3;
        let slicedPages = pages.slice( curPF, curPL);

//         // И в jsx меняем:
//         pages.map(*****)
// // на
//         slicedPages.map(*****)

        return <div className={styles.userContainer}>
            <div>
                {slicedPages.map(p => {
                    return <span key={p.id}
                        className={this.props.currentPage === p && styles.selectedPage} // {true && что-то} = вернет что-то, если слева true
                        onClick={(e) => {
                            this.onPageChanged(p)
                        }}>{p}</span>
                })}
            </div>
            {
                this.props.users.map(u => <div key={u.id} className={styles.oneUser}>
                    <div className={styles.userLeft}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={'ava'}/>
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