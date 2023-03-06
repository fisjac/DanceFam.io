import React, {useEffect, useState} from 'react'

export default function Resizer({onResize}) {


  const [mouseDown, setMouseDown] = useState(false);

  useEffect(()=> {
    const handleMouseMove = (e)=> {
      e.preventDefault();
      onResize(e);
    };

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove)
    };

    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown]);

  const handleMouseDown = () => {
    setMouseDown(true)
  };

  return (
     <div
      className='grip-lines'
      onMouseDown={handleMouseDown}
      >
        <i className="fa-solid fa-grip-lines"></i>
      </div>
  )
};
