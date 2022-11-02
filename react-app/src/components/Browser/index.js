import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom';

import * as eventActions from '../../store/events';
import * as communityActions from '../../store/communities';

import LeftBar from './LeftBar'
import EventScroll from './EventScroll'
import RightBar from './RightBar'

import './Browser.css'
import CommunityPage from '../CommunityPage';

export default function Browser() {
  const dispatch = useDispatch()
  const allEvents = useSelector(state=>state.events.allEvents);
  const allCommunities = useSelector(state=>state.communities.allCommunities);

  useEffect(()=>{
    dispatch(eventActions.getEvents())
    dispatch(communityActions.getCommunities())
  },[dispatch])

  return allEvents && allCommunities && (
      <div className='main-page'>
        <LeftBar/>
        <div className='center-container'>
          <Route exact path='/'>
            <EventScroll/>
          </Route>
          <Route path='/:community'>
            <CommunityPage/>
          </Route>
        </div>
        <RightBar/>
      </div>
  )
}
