import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import  Rooms from '../component/Rooms';
import ChatRoom from '../component/ChatRoom';
import { LOG_OUT_REQUEST } from '../reducers/user';

const MainPage = () => {
  const [current, setCurrent] = useState('');
  const dispatch = useDispatch();

  const { userName } = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
    if(e.key === 'logout') {      
      dispatch({
        type: LOG_OUT_REQUEST
      });
    }
  };

  return (
    <BrowserRouter>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="look" disabled>
           <Link to="look">
              <Icon type="appstore" />
              방보기
           </Link>
        </Menu.Item>
        <Menu.Item key="make">
           <Link to="ChatRoom">
              <Icon type="mail" />
                방입장하기
           </Link>
        </Menu.Item>
        <Menu.Item key="logout">
             로그아웃
        </Menu.Item>
      </Menu>
      <Route path="/look" component={Rooms}/>
      <Route path="/ChatRoom" component={ChatRoom}/>
    </BrowserRouter>
  );
};

export default MainPage;
