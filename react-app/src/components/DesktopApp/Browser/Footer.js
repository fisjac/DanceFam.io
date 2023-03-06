import React, {useState, useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom';

import ModalWrapper from '../../../context/Modal/Modal'
import PrivacyPolicy from '../../PrivacyPolicy';


import './Footer.css'


export default function Footer() {
  const history = useHistory();

  return (
    <div className='footer'>
      <div
        className='footer-link'
        onClick={()=>window.open('https://www.fishybusinessventures.com')}
        >
          About the Developer
      </div>
      <div>|</div>
      <div
        className='footer-link'
        onClick={()=>history.push('/app/privacy')}>
          Privacy Policy
      </div>
    </div>
  )
}
