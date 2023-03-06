import React, { useEffect, useState } from 'react'

export default function Resizer({onResize}) {
  const [touchPosition, setTouchPosition] = useState(null)

  const handleTouchStart = (e) => {
    setTouchPosition(e.targetTouches[0].clientY)
  };

  const handleTouchMove = (e) => {
    const newY = e.targetTouches[0].clientY;
    onResize(newY-touchPosition);
    setTouchPosition(newY);
  }

  return (
     <div
      className='grip-lines'
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e)=>{
        e.preventDefault();
        handleTouchMove(e);
      }}
      >
        <i className="fa-solid fa-grip-lines"></i>
      </div>
  )
};
