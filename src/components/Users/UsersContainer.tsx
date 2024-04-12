import {useSelector} from "react-redux";
import Users from "./Users.tsx"
import React from "react";
import Preloader from "../common/Preloader/Preloader.tsx";
import {getIsFetching} from "../../redux/users-selectors.ts";

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users />
    </>
}
