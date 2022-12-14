import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import * as eventActions from '../../store/events';
import * as communityActions from '../../store/communities';

import LeftBar from './LeftBar';
import EventScroll from './EventScroll';
import CommunityPage from './CommunityPage';
import EventPage from './EventPage';
import RightBar from './RightBar';

import './Browser.css'
import CommunityScroll from './CommunityScroll';

export default function Browser() {
  const dispatch = useDispatch()
  const events = useSelector(state=>state.events);
  const communities = useSelector(state=>state.communities);
  const user = useSelector(state=>state.session.user)

  useEffect(()=>{
    dispatch(eventActions.getEvents())
    dispatch(communityActions.getCommunities())
  },[dispatch])

  return events && communities && (
      <div className='main-page'>
        <LeftBar/>
        <div className='center-container scroll'>
          <div className='welcome-user'>{`Welcome ${user.firstName}`}</div>
          <Route exact path='/'>
            {communities && <CommunityScroll/>}
          </Route>
          <Route exact path='/:communityId'>
            <CommunityPage/>
          </Route>
          <Route exact path='/:communityId/events/:eventId'>
            <EventPage/>
          </Route>
        </div>
        <RightBar/>
      </div>
  )
}
