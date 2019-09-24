import React, { useState, useCallback } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {Input, Form, Button, Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAction } from './reducers/user';
import SignupForm  from './SignupForm';

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
        <BrowserRouter>
            <Row>
              <Col span={8}>
                <Form className="Form" onSubmit={handleButton}>
                    <label htmlFor='id'>아이디</label><br/>
                    <Input id='id' type='text' value={id} placeholder="아이디" onChange={changeId} required/><br/>
                    <label htmlFor='password'>비밀번호</label><br/>
                    <Input id='password' type='password' value={password} placeholder="비밀번호" onChange={changePwd} required/><br/>
                    <Button type="primary" htmlType="submit" style={{ marginRight:'10px', marginTop: '5px'}}>로그인</Button>
                    <Link to="/SignupForm"><Button type="primary" style={{ marginTop: '5px'}}>회원가입하기</Button></Link>
                </Form>
              </Col>
              <Col span={16}>
                  <Route path="/SignupForm" component={SignupForm} />
              </Col>
           </Row>
        </BrowserRouter>
    )
}

export default LoginForm;