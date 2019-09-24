import React, { useState, useCallback } from 'react';
import {Input, Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAction } from './reducers/user';

export const useInput = (initValue = null) => { //custom hook입니다.
    const [input, setter] = useState(initValue); //useState로 input의 초기값과 setter를받습니다. 
    const handler = useCallback((e) => { 
        setter(e.target.value);
    },[]);
    return [input, handler]; //setter 대신 setter에 e.target.value값을 넣는 함수를 반환합니다.
};

const LoginForm = () => {
    const [id, changeId] = useInput('');
    const [password, changePwd] = useInput('');
    const dispatch = useDispatch();

    const handleButton = (e) => {
        e.preventDefault();
        dispatch(loginAction({
            id,
            password
        }));
    }

    return (
        <>
          <Form className="Form" onSubmit={handleButton}>
            <label htmlFor='id'>아이디</label><br/>
            <Input id='id' type='text' value={id} placeholder="아이디" onChange={changeId} required/><br/>
            <label htmlFor='password'>비밀번호</label><br/>
             <Input id='password' type='password' value={password} placeholder="비밀번호" onChange={changePwd} required/><br/>
             <Button type="primary" htmlType="submit">로그인</Button>
           </Form>
        </>
    )
}

export default LoginForm;