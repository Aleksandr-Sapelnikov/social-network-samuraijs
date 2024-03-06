import React, {useEffect, useRef, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
// import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user_icon_149344.png'
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile, updateError }) => {

    let [editMode, setEditMode] = useState(false);
    let [error, setError] = useState(updateError);


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

const ProfileData = ({profile, isOwner, goToEditMode}) => {
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

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;