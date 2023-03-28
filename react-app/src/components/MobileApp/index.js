import React from 'react'
import Div100vh from 'react-div-100vh'

import MobileBrowser from './MobileBrowser';
import BottomNavBar from './BottomNavBar';

export default function index() {
  return (
    <Div100vh>
      <MobileBrowser/>
      <BottomNavBar/>
    </Div100vh>
  )
}
