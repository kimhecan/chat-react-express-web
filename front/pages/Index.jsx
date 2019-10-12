/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import LoginForm from '../component/LoginForm';



const Index = () => {
  const imgUrl = "https://user-images.githubusercontent.com/39295881/65757342-e8739400-e151-11e9-9c19-32be25e45b81.png"
  return (
      <Row>
        <Col span={16}>
          <img src={imgUrl} alt="logo" />
        </Col>
        <Col span={8}>
          <LoginForm />
        </Col>
      </Row>
  );
};

export default Index;
