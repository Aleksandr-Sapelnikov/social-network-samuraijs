import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType, submitProps) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <h1>Профиль</h1>
            <ProfileInfo isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;