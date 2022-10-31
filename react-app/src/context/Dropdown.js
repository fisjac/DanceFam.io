import React, { useEffect, useState, } from "react";


import './Dropdown.css'

export default function DropDownWrapper(props) {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

  return (
    <>
      {React.cloneElement(
        props.children,
        {
          'onClick': openMenu,
          'style': {
            'cursor': 'pointer'
          }
        }
        )}
      {<Dropdown {...props}/>}
    </>
  );
};

export function Dropdown (props) {
  const {children, menu, ...otherProps} = props
  const newMenu = React.cloneElement(menu, otherProps)

  return (
    <div
      className={`dropdown_container ${props.showMenu ? '' : 'hidden'}`}
      >
      {newMenu}
    </div>
  )
};
