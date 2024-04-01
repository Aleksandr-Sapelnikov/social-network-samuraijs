import React from 'react';
import s from './Post.module.css';


type PropsType = {
    message: string
    likesCount: number
}
const Post: React.FC<PropsType> = (props) => {

    return (
        <div className={s.item}>
            <img src='https://img.freepik.com/free-vector/vintage-monochrome-serious-russian-bear_225004-583.jpg?w=1380&t=st=1704185485~exp=1704186085~hmac=9aea029b811345070a064e8c9b577c8999a132a3085cd213856264513b04b3ec' alt={'avatar'} />
            { props.message }
            <div>
                <span>like</span> { props.likesCount }
            </div>
        </div>
    )
}

export default Post;