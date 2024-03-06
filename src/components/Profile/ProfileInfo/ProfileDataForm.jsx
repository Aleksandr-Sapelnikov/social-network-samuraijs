import React from "react";
import s from './ProfileInfo.module.css';

import {ErrorMessage, Field, Form, Formik} from "formik";

const ProfileDataForm = ({handleSubmit, profile, error}) => {

    return (
        <Formik
            initialValues={profile}

            onSubmit={handleSubmit}
        >
            {({isSubmitting, status}) => (
                <div>
                    <p>{status && <div className={s.formSummaryError}>
                        {status}
                    </div>}</p>

                    <Form>
                        <div>
                            <b>Full name</b>:
                            <div>
                                <Field type="text" name="fullName" placeholder="Full name"/>
                                <ErrorMessage name="fullName" component="div"/>
                            </div>
                        </div>

                        <div>
                            <b>Looking for a job</b>:
                            <div>
                                <Field component={"input"} name={"lookingForAJob"} type={"checkbox"}/>
                            </div>
                        </div>

                        <div>
                            <b>My professional skills (lookingForAJobDescription)</b>:
                            <div>
                                <Field type="text" name="lookingForAJobDescription" placeholder="My professional skills"/>
                                <ErrorMessage name="lookingForAJobDescription" component="div"/>
                            </div>
                        </div>

                        <div>
                            <b>About me</b>:
                            <div>
                                <Field type="text" name="aboutMe" placeholder="About me"/>
                                <ErrorMessage name="aboutMe" component="div"/>
                            </div>
                        </div>

                        <div>
                            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={s.contact}>
                                <b>{key}: <Field key={key} type="text" name={"contacts." + key}/></b>
                            </div>
                        })}
                        </div>
                        <div>
                            <button type="submit">
                                Save
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>

    )
}

// const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataForm;