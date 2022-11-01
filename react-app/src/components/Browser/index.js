import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import * as eventActions from '../../store/events';
import * as communityActions from '../../store/communities';

import LeftBar from './LeftBar'
import EventScroll from './EventScroll'
import RightBar from './RightBar'

import './Browser.css'

export default function Browser() {
  const dispatch = useDispatch()
  const allEvents = useSelector(state=>state.events.allEvents);
  const allCommunities = useSelector(state=>state.communities.allCommunities);

  useEffect(()=>{
    console.log('in useEffect')
    dispatch(eventActions.getEvents())
    dispatch(communityActions.getCommunities())
  },[dispatch])

  return allEvents && allCommunities && (
    <div className='main-page'>
      <LeftBar/>
      <EventScroll/>
      <RightBar/>
    </div>
  )
}
