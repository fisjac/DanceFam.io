
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ModalWrapper from '../context/Modal'

import logo from '../DanceFam.svg'

import './NavBar.css'
import SignUpForm from './auth/SignUpForm';
import LoginForm from './auth/LoginForm';

const NavBar = () => {
  const user = useSelector(state=>state.session.user)
  return (
    <div className='navbar'>
        <NavLink className='home-button' exact to='/'>
          <img src={logo} style={{width:'40px'}}/>
          <i className="fa-solid fa-bars"></i>
        </NavLink>
      <div className='navbar-rhs'>
        <ModalWrapper form={<LoginForm/>}>
          <div className='navbar-button'>
            Log In
          </div>
        </ModalWrapper>
        <ModalWrapper form={<SignUpForm/>} header='Sign Up'>
          <div className='navbar-button'>
            Sign Up
          </div>
        </ModalWrapper>
        {user && <LogoutButton />}
      </div>
    </div>
  );
}

export default NavBar;
