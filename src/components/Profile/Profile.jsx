import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <h1>Профиль</h1>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}  />
        </div>
    )
}

export default Profile;