import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";


const LoginForm = (props) => {

    const dispatch = useDispatch()

    const isAuth = useSelector((state) => state.auth.isAuth)

    if (isAuth) {
        return <Navigate to={"/profile"} />
    }
    const submit = (values, submitProps) => {
        dispatch(login(values.email, values.password, values.rememberMe, submitProps.setStatus))

    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={submit}
        >
            {({isSubmitting, status}) => (
                <div>
                    <Form>
                        <div>
                            <Field type="email" name="email" placeholder="email"/>
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="password"/>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <div>
                            <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                        <p>{status}</p>
                    </Form>
                </div>
            )}
        </Formik>

    )
}

export default LoginForm;