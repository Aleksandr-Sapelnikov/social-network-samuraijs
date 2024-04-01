import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader.tsx";
// import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx";
import userPhoto from '../../../assets/images/user_icon_149344.png'
import ProfileDataForm from "./ProfileDataForm.tsx";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType, submitProps) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);



    // useEffect( () => {
    //     setError(updateError);
    // }, [updateError] );

    if (!profile) {
        return <Preloader/>
    }

    function onMainPhotoSelected(e) {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    // const errorSubmitCheck = () => {
    //     setError(updateError).then(
    //         () => {
    //             if (!updateError) {
    //             setEditMode(false);
    //         }})
    // }


    // const submit = async (values, submitProps) => {
    //     await saveProfile(values, submitProps.setStatus)
    // }

    const submit = (values, submitProps) => {
        // todo: remove then
        saveProfile(values, submitProps.setStatus).then(
            () => {
                setEditMode(false);
            }
        ).catch(() => {
            console.log('error')
        });
    }


    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt={'Аватар пользователя'}/>
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

                { editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} handleSubmit={submit} />
                    : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/> }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;