import React from 'react'
import { useHistory } from 'react-router-dom';

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
