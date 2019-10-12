import React, { useState, useCallback } from 'react';
import {Input, Form, Button, Select} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CLICK_BTN2, SIGN_UP_REQUEST } from '../reducers/user';
const { Option } = Select;


export const useInput = (initValue = null) => { //custom hook입니다.
    const [input, setter] = useState(initValue); //useState로 input의 초기값과 setter를받습니다. 
    const handler = useCallback((e) => { 
        setter(e.target.value);
    },[]);
    return [input, handler]; //setter 대신 setter에 e.target.value값을 넣는 함수를 반환합니다.
};

const SignupForm = () => {
    const [id, changeId] = useInput('');
    const [password, changePwd] = useInput('');
    const [pwdChek, setPwdChk] = useState('');
    const [name, changeName] = useInput('');
    const [gender, setGender] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();

    //가입하기 버튼 눌렀을 때
    const handleButton = (e) => {
        e.preventDefault();
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                userName: name,
                userGender: gender,
            }
        });
         dispatch({
            type: CLICK_BTN2
        });
    }

    

    const changePwdChk = (e) => {
        setPasswordError(e.target.value !== password);
        setPwdChk(e.target.value)
    }

    const changeGender = (e) => {
        setGender(e);
    }
    
    return (
        <>
          <Form className="Form" onSubmit={handleButton}>
            <label htmlFor='id'>아이디</label><br/>
            <Input id='id' type='text' value={id} placeholder="아이디" onChange={changeId} required/><br/>
            <label htmlFor='password'>비밀번호</label><br/>
             <Input id='password' type='password' value={password} placeholder="비밀번호" onChange={changePwd} required/><br/>
            <label htmlFor='ChekPass'>비밀번호 재확인</label><br/>
              <Input id='ChekPass' type='password' value={pwdChek} onChange={changePwdChk}/><br/>
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
            <label htmlFor='name'>이름</label><br/>
              <Input id='name' type='text' value={name} onChange={changeName}/><br/>
            <label htmlFor='gender'>성별</label><br/>
              <Select defaultValue="성별" id='gender' onChange={changeGender}>
               <Option value="남자">남자</Option>
               <Option value="여자">여자</Option>
               </Select><br/><br/>
              <Button type="primary" htmlType="submit">가입하기</Button>
          </Form>
        </>
    )
}

export default SignupForm;