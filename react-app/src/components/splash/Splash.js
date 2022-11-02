import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../static/DanceFamBrushNoText.svg'
import title from '../../static/DanceFamTitle.svg'
import dancers from '../../static/dancing_couple1.svg'

import './Splash.css'

export default function Splash() {
  return (
    <div className='splash-page'>
      <div className='splash-top'>
      </div>
      <div className='splash-main'>
        <NavLink className='app-button' to='/home'>Join the Fam</NavLink>
        <img className='dancers-img' src={dancers} alt='dancers'/>
      <div className='logo-container'>
          <img className='logo' src={logo} alt='logo'/>
          <img className='logo-title' src={title} alt='title'/>
        </div>
      </div>
    </div>
  )
}
