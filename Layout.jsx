import React from 'react';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';


const Layout = () => {

    const { isLoggedIn } = useSelector(state => state.user);

    return (
        <>
           { isLoggedIn ? <Profile/> : <LoginForm/> }
        </>
    )
}

export default Layout;