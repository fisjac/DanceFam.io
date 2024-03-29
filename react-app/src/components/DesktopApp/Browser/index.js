import React from 'react';

import RightBar from './RightBar';
import MapBrowser from './MapBrowser'

import './Browser.css'

export default function Browser() {
  return (
    <div className='main-page__desktop'>
      <div className='center-container'>
        <MapBrowser browserType={'events'}/>
      </div>
      <RightBar/>
    </div>
  )
}
