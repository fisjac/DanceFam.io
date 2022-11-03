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

export default function Browser() {
  const dispatch = useDispatch()
  const allEvents = useSelector(state=>state.events.allEvents);
  const allCommunities = useSelector(state=>state.communities.allCommunities);
  const user = useSelector(state=>state.session.user)

  useEffect(()=>{
    dispatch(eventActions.getEvents())
    dispatch(communityActions.getCommunities())
  },[dispatch])

  return (
      <div className='main-page'>
        <LeftBar/>
        <div className='center-container'>
          <div className='welcome-user'>{`Welcome ${user.firstName}`}</div>
          <Route exact path='/'>
            {allEvents && <EventScroll showCommunity={true} events={allEvents}/>}
          </Route>
          <Route exact path='/:community'>
            <CommunityPage/>
          </Route>
          <Route exact path='/:community/events/:eventId'>
            <EventPage/>
          </Route>
        </div>
        <RightBar/>
      </div>
  )
}
