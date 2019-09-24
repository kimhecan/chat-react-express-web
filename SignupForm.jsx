import React, { useState, useCallback } from 'react';
import {Input, Form, Button, Select} from 'antd';
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
    const [year, changeYear] = useInput('');
    const [month, setMonth] = useState('');
    const [day, changeDay] = useInput('')
    const [gender, setGender] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    


    //가입하기 버튼 눌렀을 때
    const handleButton = (e) => {
        e.preventDefault();
        console.log({
            id,password,pwdChek,name,year,month,day,gender
        });
    }

    const changePwdChk = (e) => {
        setPasswordError(e.target.value !== password);
        setPwdChk(e.target.value)
    }

    const changeGender = (e) => {
        setGender(e);
    }

    const changeMonth = (e) => {
        setMonth(e);
    }

    const months = [1,2,3,4,5,6,7,8,9,10,11,12];

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
             <label htmlFor='year'>생년월일</label><br/>
              <Input id='year' type='text' value={year} placeholder="년"  onChange={changeYear}/>
            <Select defaultValue="월" id='month' onChange={changeMonth}>
            {months.map((v, i) => {
                return (
                    <Option key={i} value={v}>{v}</Option>
                  )
              })}
              </Select>
               <Input id='day' type='text' value={day} placeholder="일" onChange={changeDay}/>
               <br/>
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