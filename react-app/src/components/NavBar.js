
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ModalWrapper from '../context/Modal'

import logo from '../DanceFam.svg'

import './NavBar.css'
import SignUpForm from './auth/SignUpForm';

const NavBar = () => {
  const user = useSelector(state=>state.session.user)
  return (
    <div className='navbar'>
        <NavLink className='home-button' exact to='/'>
          <img src={logo} style={{width:'40px'}}/>
          Home
        </NavLink>
      <div className='navbar-rhs'>``
        <div className='navbar-button'>
          Log In
        </div>
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
