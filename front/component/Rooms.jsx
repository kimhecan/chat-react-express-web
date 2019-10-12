import React from 'react';
import Room from './Room';

const Rooms = () => {
  console.log(321321);
  
  const list = [1,2,3,4];
    
  return (
    <>
      {list.map(v => (
        <Room key={v} />
      ))}
    </>
  )
};

export default Rooms;
