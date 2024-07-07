import React, { useState } from 'react';
import './LoginPage.css';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthendicated } from '../services/Auth';
import NavBar from '../components/NavBar';

const LoginPage = () => {
    const navigate = useNavigate();
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null,
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handleInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.email == '') {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == '') {
            errors.password.required = true;
            hasError = true;
        }
        if (!hasError) {
            setLoading(true);
            //sending login api request
            LoginApi(inputs)
                .then((response) => {
                    storeUserData(response.data.idToken);
                })
                .catch((err) => {
                    if (err.response.data.error.message == 'EMAIL_EXISTS') {
                        setErrors({
                            ...errors,
                            custom_error:
                                'Already this email has been registred',
                        });
                    } else if (
                        String(err.response.data.error.message).includes(
                            'WEAK_PASSWORD'
                        )
                    ) {
                        setErrors({
                            ...errors,
                            custom_error:
                                'password should be atleast 6 characters',
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        setErrors({ ...errors });
    };

    if (isAuthendicated()) {
        return navigate('/dashboard');
    }
    return (
        <>
            <NavBar />
            <section className='login-block'>
                <div className='container'>
                    <div className='row '>
                        <div className='col login-sec'>
                            <h2 className='text-center'>Login Now</h2>
                            <form
                                className='login-form'
                                action=''
                                onSubmit={handleSubmit}
                            >
                                <div className='form-group'>
                                    <label
                                        htmlFor='exampleInputEmail1'
                                        className='text-uppercase'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        name='email'
                                        id=''
                                        placeholder='email'
                                        onChange={handleInput}
                                    />
                                    {errors.email.required === true ? (
                                        <span className='text-danger'>
                                            Email is required.
                                        </span>
                                    ) : null}
                                </div>
                                <div className='form-group'>
                                    <label
                                        htmlFor='exampleInputPassword1'
                                        className='text-uppercase'
                                    >
                                        Password
                                    </label>
                                    <input
                                        className='form-control'
                                        type='password'
                                        name='password'
                                        placeholder='password'
                                        id=''
                                        onChange={handleInput}
                                    />
                                    {errors.password.required === true ? (
                                        <span className='text-danger'>
                                            Password is required.
                                        </span>
                                    ) : null}
                                </div>
                                <div className='form-group'>
                                    {loading ? (
                                        <div className='text-center'>
                                            <div
                                                className='spinner-border text-primary '
                                                role='status'
                                            >
                                                <span className='sr-only'>
                                                    Loading...
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                    <span className='text-danger'>
                                        {errors.custom_error ? (
                                            <p>{errors.custom_error}</p>
                                        ) : null}
                                    </span>
                                    <input
                                        type='submit'
                                        className='btn btn-login float-right'
                                        value='Login'
                                        disabled={loading}
                                    />
                                </div>
                                <div className='clearfix'></div>
                                <div className='form-group'>
                                    Create new account ? Please{' '}
                                    <Link to='/register'>Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;
