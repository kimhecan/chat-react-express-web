import React, { useState,createContext, useRef } from 'react'; //React와 Hooks인 useState를 'react'로 부터 불러옴
import Table from './Table';

export const TableContext = createContext();

const Test = () => {
    
    const [value, setValue] = useState('');  
    const [tableData, setTableData] = useState( 
        [['7','8','9','+'],
         ['4','5','6','-'],
         ['1','2','3','*'],
         ['0','00','.','/']
        ]);
    const input = useRef(null);

    const handleChange = (e) => { 
        setValue(e.target.value);
    }                    
    
    const handleButton = () => {
        setValue(eval(input.current.value));
    }

    return (
        <TableContext.Provider value={{tableData, input}}>
          계산기<br/>
          <input ref={input} value={value} onChange={handleChange}/>
          <Table tableData={tableData} /> 
          <button onClick={handleButton}>계산하기</button>
        </TableContext.Provider>
    )
}

export default Test
