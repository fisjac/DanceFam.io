import React from 'react'

import LeftBar from './LeftBar'
import EventScroll from './EventScroll'
import RightBar from './RightBar'
import { useSelector } from 'react-redux'

import './Browser.css'

export default function Browser() {

  const events = useSelector(state=>state.events);
  const communities = useSelector(state=>state.communities);



  return events && communities && (
    <div className='main-page'>
      <LeftBar/>
      <EventScroll/>
      <RightBar/>
    </div>
  )
}
