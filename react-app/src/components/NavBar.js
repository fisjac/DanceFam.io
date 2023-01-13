
import React from 'react';
import { useSelector } from 'react-redux';

import Places from '../context/Places';
import LogoutButton from './auth/LogoutButton';
import DropDownWrapper from '../context/Dropdown/Dropdown';
import CreateEventForm from './Browser/forms/CreateEventForm';
// import logo from '../static/DanceFamBrushNoText.svg'

import './NavBar.css'
import ModalWrapper from '../context/Modal/Modal';


const CreateMenu = () => {
  return (
    <div className='create-dropdown'>
      <ModalWrapper
        header='Create an Event'
        form={<CreateEventForm/>}
        >
        <div className='dropdown-button'>Create Event</div>
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
          <div className='icon-button'>
            <i className="fa-solid fa-plus"></i>
          </div>
        </DropDownWrapper>
        <DropDownWrapper menu={
          <div className='user-dropdown'>
            {user && <LogoutButton />}
          </div>
        }>
          <div className='icon-button'>
            <i className="fa-solid fa-user"></i>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </DropDownWrapper>
      </div>
    </div>
  );
}

export default NavBar;
