import React from 'react';
import { isAuthendicated } from '../services/Auth';
import { Link } from 'react-router-dom';

const NavBar = ({ logoutUser }) => {
    return (
        <div>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <a className='navbar-brand' href='#'>
                    Authendication
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarsExampleDefault'
                    aria-controls='navbarsExampleDefault'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarsExampleDefault'
                >
                    <ul className='navbar-nav mr-auto'>
                        {!isAuthendicated() ? (
                            <li className='nav-item'>
                                <Link className='nav-link' to='/register'>
                                    Register
                                </Link>
                            </li>
                        ) : null}
                        {!isAuthendicated() ? (
                            <li>
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            </li>
                        ) : null}
                        {isAuthendicated() ? (
                            <li className='nav-item'>
                                <Link className='nav-link' to='/dashboard'>
                                    Dashboard
                                </Link>
                            </li>
                        ) : null}
                        {isAuthendicated() ? (
                            <li>
                                <a className='nav-link' onClick={logoutUser}>
                                    Logout
                                </a>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
