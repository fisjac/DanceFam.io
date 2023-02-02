import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';

import ModalWrapper from '../context/Modal/Modal'
import PrivacyPolicy from './PrivacyPolicy';


import './Footer.css'


export default function Footer() {


  return (
    <div className='footer'>
      {/* <ModalWrapper header='About Me' form={<div>about me</div>}>
        <div className='footer-link'>About Me</div>
      </ModalWrapper> */}
      <ModalWrapper header='Privacy Policy' form={<PrivacyPolicy/>}>
        <div className='footer-link'>Privacy Policy</div>
      </ModalWrapper>
    </div>
  )
}
