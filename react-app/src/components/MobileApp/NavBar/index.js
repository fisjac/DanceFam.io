
import React from 'react';
import { useSelector } from 'react-redux';

import LogoutButton from '../../auth/LogoutButton';
import LoginForm from '../../auth/LoginForm';
import SignUpForm from '../../auth/SignUpForm';

import DropDownWrapper from '../../../context/Dropdown/Dropdown';
import ModalWrapper from '../../../context/Modal/Modal';
import AddVenueForm from '../MobileBrowser/forms/AddVenueForm';
import CreateEventForm from '../MobileBrowser/forms/CreateEventForm';

import './NavBar.css'

const AddEventButton = () => {
  return (
    <ModalWrapper
      header='Create an Event'
      bespokeClassName='create-event__mobile'
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
    bespokeClassName='create-venue__mobile'
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
        bespokeClassName='login__mobile'
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
      bespokeClassName='signup__mobile'
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

  const user = useSelector(state=>state.session.user)
  return (
    <div className='navbar__mobile'>
        <div className='search-area'>
          {/* <div className='mag-glass'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type='text'
            className='search-input'
            /> */}
        </div>
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
