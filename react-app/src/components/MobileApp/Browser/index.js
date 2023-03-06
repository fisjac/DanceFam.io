import React from 'react';


import RightBar from './RightBar';

import MapBrowser from './MapBrowser'

import './Browser.css'
import NavBar from './NavBar';

export default function Browser() {
  return (
    <div className='main-page'>
      <div className='center-container'>
        <MapBrowser browserType={'events'}/>
      </div>
      <RightBar/>
    </div>
  )
}
