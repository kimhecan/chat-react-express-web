import React from 'react';
import Profile from './Profile';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';


const Layout = () => {

    const { isLoggedIn } = useSelector(state => state.user);

    return (
        <>
           <Row>
              <Col span={8}>
                 {isLoggedIn ?
                    <Profile/>
                     :
                    <LoginForm/>
                }
              </Col>
              <Col span={16}>
              </Col>
           </Row>
        
        </>
    )
}

export default Layout;