/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Layout = () => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, []);
  

  return (
    <>
      { userId ? <MainPage /> : <LoginPage /> }
    </>
  );
};

export default Layout;
