import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../static/DanceFamBrushNoText.svg'
import title from '../../static/DanceFamTitle.svg'
import dancers from '../../static/dancing_couple1.svg'



import './Splash.css'


export default function Splash() {
  const history = useHistory();
  return (
    <div className='splash-page'>
      <div className='splash-top'>
      </div>
      <div className='splash-main'>
          <button className='join-button' onClick={()=>history.push('/app')}>Join the Fam</button>
        <img className='dancers-img' src={dancers} alt='dancers'/>
      <div className='logo-container'>
          <img className='logo' src={logo} alt='logo'/>
          <img className='logo-title' src={title} alt='title'/>
        </div>
      </div>
    </div>
  )
}
