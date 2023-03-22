import React from 'react';

import MapBrowser from './MapBrowser'

import './MobileBrowser.css'

export default function MobileBrowser() {
  return (
    <div className='main-page'>
      <div className='center-container'>
        <MapBrowser browserType={'events'}/>
      </div>
      {/* <RightBar/> */}
    </div>
  )
}
