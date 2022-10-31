
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ModalWrapper from '../context/Modal'

import logo from '../DanceFam_Brush_notext.svg'

import './NavBar.css'
import SignUpForm from './auth/SignUpForm';
import LoginForm from './auth/LoginForm';
import DropDownWrapper from '../context/Dropdown';

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
            <ModalWrapper form={<LoginForm/>}>
              <div className='dropdown-button'>
                Log In
              </div>
            </ModalWrapper>
            <ModalWrapper form={<SignUpForm/>} header='Sign Up'>
              <div className='dropdown-button'>
                Sign Up
              </div>
            </ModalWrapper>
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
