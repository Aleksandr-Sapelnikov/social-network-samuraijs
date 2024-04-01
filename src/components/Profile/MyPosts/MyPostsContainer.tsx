
import {actions} from "../../../redux/profile-reducer.ts";
import MyPosts from "./MyPosts.tsx";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             let action = actions.updateNewPostTextActionCreator(text);
//             dispatch(action);
//         },
//         addPost: () => {
//             dispatch(actions.addPostActionCreator());
//         }
//     }
// }

const MyPostsContainer = connect(mapStateToProps,
    {
        addPost: actions.addPostActionCreator,
        updateNewPostText: actions.updateNewPostTextActionCreator
    })(MyPosts)

export default MyPostsContainer;