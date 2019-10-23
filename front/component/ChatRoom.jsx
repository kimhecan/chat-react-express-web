import React, { useState, useCallback, useEffect } from 'react';
import { Input, Form, Button, Row, Col, List, Avatar} from 'antd';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

export const useInput = (initValue = null) => {
    const [input, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [input, handler];
  };

const socket = io.connect('localhost:3065');

const ChatRoom = () => {
    
  const [users, setUsers] = useState(null);
  const [messages, setMessages] = useState([]);
  const { userName } = useSelector((state) => state.user);


  useEffect(() => {
      socket.on('message', (message) => {
          const messagess = [...messages, message];
          setMessages(messagess);
      });
      socket.on('update', ({users}) => {
          setUsers(users);
      });
  }, [users, messages]);

  const handleMessageSubmit = (message) => {
      const messagess = [...messages, message];
      setMessages(messagess);
      socket.emit('message', message);
  };
  

  const Layout = () => {
      return(
          <Row>
              <Col span={4}>
                  <UserList users={users} />
              </Col>
              <Col span={16}>
                  {messages.length !== 0 ?
                      <div> 
                          <MessageList messages={messages} />
                          <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={userName}/>
                      </div>
                      :
                      <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={userName}/>
                  }
              </Col>
              <Col span={4}>
                <img width="200" alt="backaa" src="https://user-images.githubusercontent.com/39295881/67362017-19a28100-f5a5-11e9-900d-c4177a0f36ec.PNG" />
              </Col>
          </Row>
      )
  }

  return (
      <>
       {(userName !== '' && users !== null) ? Layout() : <UserForm />}
      </>
  )
};

const UserForm = () => {

  const { userName } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit('join', userName);
  }

    return (
        <>
         <br />
         <Form className="Form" onSubmit={handleSubmit}>
            <Button type="primary" htmlType="submit" style={{ margin: 'auto', marginTop: '30px' }}>택시를 같이 탈 사람들과 Contact 하시겠습니까?</Button>
         </Form>
        </>
    )
};

const UserList = ({users}) => {
  console.log(users);
  return (
      <>
        <div>
          <List
           itemLayout="horizontal"
           dataSource={users}
           renderItem={item => (
           <List.Item>
              <List.Item.Meta
               avatar={<Avatar src="https://user-images.githubusercontent.com/39295881/67360481-08f00c00-f5a1-11e9-9704-a846132baf0e.png" />}
               title={<a>{item.name}</a>}
               />
           </List.Item>
          )}
         />
       </div> 
      </>
  )
};

const MessageForm = (props) => {

  const { name, onMessageSubmit } = props;

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();

      const message = {
          from: name,
          text
      };
      onMessageSubmit(message);
      setText('');
  };

  const changeHandler = (e) => {
      setText(e.target.value);
  };

  return (
      <>
        <form className='MessageForm' onSubmit={handleSubmit}>
            <input
              className='MessageInput'
              onChange={changeHandler}
              value={text}
              placeholder="Message"
              autoFocus
            />
        </form>
      </>
  )
}



const MessageList = ({messages}) => {
  return (
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://user-images.githubusercontent.com/39295881/67360481-08f00c00-f5a1-11e9-9704-a846132baf0e.png" />}
                title={<a href="https://ant.design">{item.from}</a>}
                description= {item.text}
              />
            </List.Item>
          )}
        />
  )
}

export default ChatRoom;