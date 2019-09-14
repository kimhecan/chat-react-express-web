import React, { memo, useContext } from 'react';
import { TableContext } from './Test'


const Td = memo(({ rowIndex, cellIndex, cellData }) => {
    const { tableData, input } = useContext(TableContext);

    const onClickTd = () => {
        input.current.value += tableData[rowIndex][cellIndex];
    }
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td