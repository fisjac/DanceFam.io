import React from 'react'
import Div100vh from 'react-div-100vh'

import MobileBrowser from './MobileBrowser';
import NavBar from './NavBar';

export default function index() {
  return (
    <Div100vh>
      <NavBar/>
      <MobileBrowser/>
      {/* <BottomNavBar/> */}
    </Div100vh>
  )
}
