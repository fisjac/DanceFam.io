
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import logo from '../DanceFam.svg'

const NavBar = () => {
  return (
    <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img src={logo} style={{width:'40px'}}/>
          Home
        </NavLink>

        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
        <LogoutButton />
    </div>
  );
}

export default NavBar;
