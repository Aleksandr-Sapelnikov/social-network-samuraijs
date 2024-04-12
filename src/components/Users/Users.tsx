import React, {useEffect} from "react";
import styles from './Users.module.css'
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors.ts";
import {FilterType, requestUsers, follow, unfollow} from "../../redux/users-reducer.ts";
import {AppDispatch} from "../../redux/redux-store";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {}
type QueryParamsType = { term?: string; page?: string; friend?: string }
export const Users: React.FC<PropsType> = (props) => {

    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams(location.search)
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        let parsed = Object.fromEntries([...searchParams])

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true"}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        // @ts-ignore
        let parsed = Object.fromEntries([...searchParams])
        console.log(parsed)
        // let actualPage = currentPage
        // let actualFilter = filter
        //
        // if (!!parsed.page) actualPage = Number(parsed.page)
        //
        // if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        // if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true"}
        //
    }, [searchParams])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        setSearchParams( query )

    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow_u = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollow_u = (userId: number) => {
        dispatch(unfollow(userId));
    }

    return <div className={styles.userContainer}>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                   pageSize={pageSize} onPageChanged={onPageChanged}/>
        {
            users.map(u => <User user={u}
                                 followingInProgress={followingInProgress}
                                 unfollow={unfollow_u}
                                 follow={follow_u}
                                 key={u.id}/>
            )
        }

    </div>

}
export default Users;