import React, { useEffect, useState } from 'react';
import { userDetailsApi } from '../services/Api';
import NavBar from '../components/NavBar';
import { isAuthendicated, logout } from '../services/Auth';
import { useNavigate, Navigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', localId: '' });
    useEffect(() => {
        if (isAuthendicated) {
            userDetailsApi().then((response) => {
                const user = response.data.users[0];
                setUser({
                    name: user.displayName,
                    email: user.email,
                    localId: user.localId,
                });
            });
        }
    }, []);
    const logoutUser = () => {
        logout();
        navigate('/login');
    };
    if (!isAuthendicated()) {
        return <Navigate to='/login' />;
    }
    return (
        <>
            <NavBar logoutUser={logoutUser} />
            <main role='main' className='container mt-5'>
                <div className='container'>
                    <div className='text-center mt-5'>
                        <h3>Dashboard page</h3>
                        {user.name && user.email && user.localId ? (
                            <div>
                                <p className='text-bold '>
                                    Hi {user.name}, your Firebase ID is
                                    {user.localId}
                                </p>
                                <p>Your email is {user.email}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardPage;
