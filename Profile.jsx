import React from 'react';
import { useSelector } from 'react-redux';
import { Card,  Icon, Avatar } from 'antd';
import { Button } from 'antd/lib/radio';
import { useDispatch } from 'react-redux';
import { logoutAction } from './reducers/user';
const { Meta } = Card;


const Profile = () => {

    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const onLogout = () => {
      dispatch(logoutAction);
    }
  
    return (
        <>
         <Card 
             style={{ width: 300, marginTop: 16 }}
             actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={user.id}
            description="Profile wth antDesign"
          />
          <Button onClick={onLogout}>로그아웃</Button>
        </Card>
        </>
    )
}

export default Profile;