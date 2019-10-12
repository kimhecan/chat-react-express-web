import React from 'react';
import { Card, Avatar } from 'antd';
const { Meta } = Card;


const Room = () => {
  console.log(123);
  
  const cardClick = () => {
    console.log('방입장');
    
  }
  return (
    <>
      <br /><br />
      <Card
        onClick= {cardClick}
        style={{ width: 400, height: 100, margin: 'auto' }}
      >
        <Meta
          avatar={<Avatar src="https://user-images.githubusercontent.com/39295881/65941256-94282700-e465-11e9-9ec7-b7c0d4b19532.png" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
    </>
  )
};

export default Room;
