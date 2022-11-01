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
      <div className='logo-container'>
          <img src={logo} alt='logo' style={{'width': '50px'}}/>
          <img src={title} alt='title' style={{'width': '100px'}}/>
        </div>
      </div>
      <div className='splash-main'>

        <img className='dancers-img' src={dancers} alt='dancers'/>
        <NavLink className='app-button' to='/home'>Join the Fam</NavLink>
      </div>
    </div>
  )
}
