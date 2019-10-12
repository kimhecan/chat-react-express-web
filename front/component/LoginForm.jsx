import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form, Button } from 'antd';
import SignupForm from './SignupForm';
import { LOG_IN_REQUEST ,CLICK_BTN } from '../reducers/user';

export const useInput = (initValue = null) => {
    const [input, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [input, handler];
  };

const LoginForm = () => {

  const [id, changeId] = useInput('');
  const [password, changePwd] = useInput('');
  const dispatch = useDispatch();
  const { click, isLoggingIn } = useSelector( (state) => state.user);

  
  const signupClickBtn = (e) => {
    e.preventDefault();
    dispatch({
      type: CLICK_BTN
    });
    
  }

  const submitButton = (e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userId: id,
        password
      }
    });

  };
    return (
        <>
          <br /><br /><br /><br /><br /><br /><br />
          { click ? <SignupForm />
            :
          <Form className="Form" onSubmit={submitButton}>
            <label htmlFor="id">아이디</label>
            <br />
            <Input id="id" type="text" value={id} placeholder="아이디" onChange={changeId} required />
            <br />
            <label htmlFor="password">비밀번호</label>
            <br />
            <Input id="password" type="password" value={password} placeholder="비밀번호" onChange={changePwd} required />
            <br />
            <Button type="primary" htmlType="submit" loading={isLoggingIn} style={{ marginRight: '10px', marginTop: '5px' }}>로그인</Button>
            <Button type="primary" onClick={signupClickBtn} style={{ marginTop: '5px' }}>회원가입하기</Button>
          </Form>
        }
      </>
    )
}

export default LoginForm;