/* eslint-disable linebreak-style */
import React, { useState, useCallback } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Input, Form, Button, Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAction } from './reducers/user';
import SignupForm from './SignupForm';

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

  const handleButton = (e) => {
    e.preventDefault();
    dispatch(loginAction({
      id,
      password,
    }));
  };

  return (
    <BrowserRouter>
      <Row>
        <Col span={8}>
          <Form className="Form" onSubmit={handleButton}>
            <label htmlFor="id">아이디</label>
            <br />
            <Input id="id" type="text" value={id} placeholder="아이디" onChange={changeId} required />
            <br />
            <label htmlFor="password">비밀번호</label>
            <br />
            <Input id="password" type="password" value={password} placeholder="비밀번호" onChange={changePwd} required />
            <br />
            <Button type="primary" htmlType="submit" style={{ marginRight: '10px', marginTop: '5px' }}>로그인</Button>
            <Link to="/SignupForm"><Button type="primary" style={{ marginTop: '5px' }}>회원가입하기</Button></Link>
          </Form>
        </Col>
        <Col span={16}>
          <Route path="/SignupForm" component={SignupForm} />
        </Col>
      </Row>
    </BrowserRouter>
  );
};

export default LoginForm;
