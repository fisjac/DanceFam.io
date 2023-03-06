
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutButton from '../../auth/LogoutButton';
import LoginForm from '../../auth/LoginForm';
import SignUpForm from '../../auth/SignUpForm';

import DropDownWrapper from '../../../context/Dropdown/Dropdown';
import ModalWrapper from '../../../context/Modal/Modal';
import AddVenueForm from '../MobileBrowser/forms/AddVenueForm';
import CreateEventForm from '../MobileBrowser/forms/CreateEventForm'

import './BottomNavBar.css'

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
    <div className='mobile-create-dropdown'>
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
    <div className='bottom-navbar'>
      <div>
        <DropDownWrapper menu={<CreateMenu/>}>
          <div className='mobile-icon-button'>
            <i className="fa-solid fa-plus"></i>
            <div className='icon-label'>Create</div>
          </div>
        </DropDownWrapper>
      </div>
      <div>
        <DropDownWrapper menu={
          <div className='mobile-user-dropdown'>
            {user && <LogoutButton />}
            {!user && (
            <>
              <LoginButton/>
              <SignupButton/>
            </>
            )}
          </div>
        }>
          <div className='mobile-icon-button'>
            <i className="fa-solid fa-user"></i>
            <div className='icon-label'>User</div>
          </div>
        </DropDownWrapper>
      </div>
    </div>
  );
}

export default NavBar;
