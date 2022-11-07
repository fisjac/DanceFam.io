import React from 'react';

import ModalWrapper from '../../context/Modal';
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';

import logo from '../../static/DanceFamBrushNoText.svg'
import title from '../../static/DanceFamTitle.svg'
import dancers from '../../static/dancing_couple1.svg'



import './Splash.css'

export function AuthForm(props) {
  return (
    <div className='auth-form'>
      <ModalWrapper
        form={<LoginForm/>}
        closePrev={props.setShowModal}
        header='Log In'>
        <div className='dropdown-button'>
          Log In
        </div>
      </ModalWrapper>
      <ModalWrapper
        form={<SignUpForm/>}
        closePrev={props.setShowModal}
        header='Sign Up'
        >
        <div className='dropdown-button'>
          Sign Up
        </div>
      </ModalWrapper>
    </div>
  )
}


export default function Splash() {
  return (
    <div className='splash-page'>
      <div className='splash-top'>
      </div>
      <div className='splash-main'>
        <ModalWrapper header='Log in or sign up' form={<AuthForm/>}>
          <button className='join-button'>Join the Fam</button>
        </ModalWrapper>
        <img className='dancers-img' src={dancers} alt='dancers'/>
      <div className='logo-container'>
          <img className='logo' src={logo} alt='logo'/>
          <img className='logo-title' src={title} alt='title'/>
        </div>
      </div>
    </div>
  )
}
