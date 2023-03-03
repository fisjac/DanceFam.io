
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutButton from './auth/LogoutButton';
import DropDownWrapper from '../context/Dropdown/Dropdown';
import CreateEventForm from './Browser/forms/CreateEventForm'
import logo from '../static/DanceFamBrushNoText.svg';
import title from '../static/DanceFamTitle.svg';
import ModalWrapper, { Modal } from '../context/Modal/Modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import AddVenueForm from './Browser/forms/AddVenueForm';

import './NavBar.css'

const AddEventButton = () => {
  return (
    <ModalWrapper
      header='Create an Event'
      form={<CreateEventForm/>}
      >
      <div className='dropdown-button'>Create Event</div>
    </ModalWrapper>
  )
}

const AddVenueButton = () => {
  return (
    <ModalWrapper
    form={<AddVenueForm/>}
    header='Add a venue'
    >
    <div className='dropdown-button'>Add Venue</div>
  </ModalWrapper>
  )
};

const CreateMenu = () => {
  return (
    <div className='create-dropdown'>
      <AddEventButton/>
      <AddVenueButton/>
    </div>
  )
}

const LoginButton = (props) => {
  return (
    <ModalWrapper
        form={<LoginForm/>}
        closePrev={props.setShowModal}
        header='Log In'>
        <div className='dropdown-button'>
          Log In
        </div>
      </ModalWrapper>
  )
};

const SignupButton = (props) => {
  return (
    <ModalWrapper
    form={<SignUpForm/>}
    header='Sign Up'
    >
    <div className='dropdown-button'>
      Sign Up
    </div>
  </ModalWrapper>
  )
};


const NavBar = () => {
  const history = useHistory();

  const user = useSelector(state=>state.session.user)
  return (
    <div className='navbar'>
      <div className='left-bar-logo-container' onClick={()=>history.push('/')}>
        <img className='left-bar-logo' src={logo} alt='logo'/>
        <img className='left-bar-logo-title' src={title} alt='title'/>
      </div>
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
        {user && (<DropDownWrapper menu={<CreateMenu/>}>
          <div className='icon-button'>
            <i className="fa-solid fa-plus"></i>
          </div>
        </DropDownWrapper>)}
        <DropDownWrapper menu={
          <div className='user-dropdown'>
            {user && <LogoutButton />}
            {!user && (
            <>
              <LoginButton/>
              <SignupButton/>
            </>
            )}
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
