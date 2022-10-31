import React from 'react'
import { NavLink } from 'react-router-dom'

import dancers from '../../static/dancing_couple1.svg'

import './Splash.css'

export default function Splash() {
  return (
    <div className='splash-page'>
      <div className='splash-top'>Top Bar</div>
      <div className='splash-main'>
        <img src={dancers} style={{'width': '250px'}}/>
        <NavLink className='app-button' to='/home'>Go to app</NavLink>
      </div>
    </div>
  )
}
