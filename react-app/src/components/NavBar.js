
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DropDownWrapper from '../context/Dropdown';

// import logo from '../static/DanceFamBrushNoText.svg'

import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state=>state.session.user)
  return (
    <div className='navbar'>
        <NavLink className='navbar-button' exact to='/'>
          <i className="fa-solid fa-bars"></i>
        </NavLink>
        <div className='search-area'>
          <div className='mag-glass'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type='text'
            className='search-input'
            />
        </div>
      <div className='navbar-rhs'>
        <DropDownWrapper menu={
          <div className='user-dropdown'>
            {user && <LogoutButton />}
          </div>
        }>
          <div className='navbar-button'>
            <i className="fa-solid fa-user"></i>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </DropDownWrapper>
      </div>
    </div>
  );
}

export default NavBar;
