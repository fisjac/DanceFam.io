import React from 'react';


import LeftBar from './LeftBar/';
import RightBar from './RightBar';

import MapBrowser from './MapBrowser'

import './Browser.css'

export default function Browser() {
  return (
      <div className='main-page'>
        <LeftBar/>
        <div className='center-container'>
        <div className='eventscroll-title'>Upcoming Events</div>
          <MapBrowser browserType={'events'}/>
        </div>
        <RightBar/>
      </div>
  )
}
