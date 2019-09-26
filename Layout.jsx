/* eslint-disable linebreak-style */
import React from 'react';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import LoginForm from './LoginForm';

const Layout = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      { isLoggedIn ? <Profile /> : <LoginForm /> }
    </>
  );
};

export default Layout;
