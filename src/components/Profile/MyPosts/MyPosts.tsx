import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.tsx';
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: () => void
    updateNewPostText: (string) => void
    newPostText: string
}
//можно обернуть в React.memo
const MyPosts: React.FC<PropsType> = (props) => {
    let postsElements =
        props.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={ onPostChange } ref={newPostElement}
                              value={props.newPostText} />
                </div>
                <div>
                    <button onClick={ onAddPost }>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;