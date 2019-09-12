import React, {useMemo} from 'react';
import Td from './Td';


const Tr = ({ rowData, rowIndex }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                useMemo(
                    () => <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}></Td>,
                    [rowData[i]],
                )
            ))}
        </tr>
    )
}

export default Tr