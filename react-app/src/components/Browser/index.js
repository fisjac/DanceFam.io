import React from 'react'

import LeftBar from './LeftBar'
import EventScroll from './EventScroll'
import RightBar from './RightBar'

export default function Browser() {
  return (
    <div className='main-page'>
      <LeftBar/>
      <EventScroll/>
      <RightBar/>
    </div>
  )
}
