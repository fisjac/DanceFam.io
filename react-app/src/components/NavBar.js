
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DropDownWrapper from '../context/Dropdown';

// import logo from '../static/DanceFamBrushNoText.svg'

import './NavBar.css'
import ModalWrapper from '../context/Modal';
import CreateCommunityForm from './Browser/forms/CreateCommunityForm';


const CreateMenu = () => {
  return (
    <div className='create-dropdown'>
      <ModalWrapper
        header='Build a Community'
        form={<CreateCommunityForm/>}>
        <div>Create Community</div>
      </ModalWrapper>
    </div>
  )
}


const NavBar = () => {
  const user = useSelector(state=>state.session.user)
  return (
    <div className='navbar'>
        {/* <div className='search-area'>
          <div className='mag-glass'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type='text'
            className='search-input'
            />
        </div> */}
      <div className='navbar-rhs'>
        <DropDownWrapper menu={<CreateMenu/>}>
          <div className='navbar-button'>
            <i className="fa-solid fa-plus"></i>
          </div>
        </DropDownWrapper>
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
