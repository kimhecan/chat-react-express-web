import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';

export const useInput = (initValue = null) => {
    const [input, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [input, handler];
  };


const setRoom = () => {

    const [title, changeTitle] = useState('');
    const [description, changeDesc] = useState('');

    const handleButton = () => {

    }

    return (
        <>
         <br />
         <Form className="Form" onSubmit={handleButton}>
            <label htmlFor="title">방 제목</label>
            <br />
            <Input id="title" type="text" value={title} placeholder="방 제목을 입력해주세요" onChange={changeTitle} required />
            <br />
            <label htmlFor="description">설명</label>
            <br />
            <Input id="description" type="text" value={description} placeholder="분할방법(토스 or 카카오페이 or 현금) / 전화번호 " onChange={changeDesc} required />
            <br />
            <Button type="primary" htmlType="submit" style={{ margin: 'auto', marginTop: '5px' }}>방 만들기</Button>
            
         </Form>
        </>
    )
}

export default setRoom;