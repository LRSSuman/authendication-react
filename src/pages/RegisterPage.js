import React, { useState } from 'react';
import './RegisterPage.css';
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import { isAuthendicated } from '../services/Auth';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const RegisterPage = () => {
    const navigate = useNavigate();
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        name: { required: false },
        custom_error: null,
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.name == '') {
            errors.name.required = true;
            hasError = true;
        }
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
            //sending regester api request
            RegisterApi(inputs)
                .then((response) => {
                    storeUserData(response.data.idToken);
                })
                .catch((err) => {
                    if (String(err.code).includes('ERR_BAD_REQUEST')) {
                        setErrors({
                            ...errors,
                            custom_error: 'Invalid Credentials.',
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        setErrors({ ...errors });
    };

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

    if (isAuthendicated()) {
        return navigate('/dashboard');
    }

    return (
        <>
            <NavBar />
            <section className='register-block'>
                <div className='container'>
                    <div className='row '>
                        <div className='col register-sec'>
                            <h2 className='text-center'>Register Now</h2>
                            <form
                                className='register-form'
                                onSubmit={handleSubmit}
                                action=''
                            >
                                <div className='form-group'>
                                    <label
                                        htmlFor='exampleInputEmail1'
                                        className='text-uppercase'
                                    >
                                        Name
                                    </label>

                                    <input
                                        type='text'
                                        className='form-control'
                                        name='name'
                                        id=''
                                        onChange={handleInput}
                                    />
                                    {errors.name.required === true ? (
                                        <span className='text-danger'>
                                            Name is required.
                                        </span>
                                    ) : null}
                                </div>
                                <div className='form-group'>
                                    <label
                                        htmlFor='exampleInputEmail1'
                                        className='text-uppercase'
                                    >
                                        Email
                                    </label>

                                    <input
                                        type='text'
                                        className='form-control'
                                        name='email'
                                        id=''
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
                                    <span className='text-danger'>
                                        {errors.custom_error ? (
                                            <p>{errors.custom_error}</p>
                                        ) : null}
                                    </span>
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

                                    <input
                                        type='submit'
                                        className='btn btn-login float-right'
                                        value='Register'
                                        disabled={loading}
                                    />
                                </div>
                                <div className='clearfix'></div>
                                <div className='form-group'>
                                    Already have account ? Please{' '}
                                    <Link to='/login'>Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterPage;
