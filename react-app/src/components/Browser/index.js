import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import * as eventActions from '../../store/events';

import LeftBar from './LeftBar/';
import EventPage from './EventPage';
import RightBar from './RightBar';
import EventScroll from './EventScroll';
import EventsMap from './EventsMap';


import './Browser.css'

export default function Browser() {
  const dispatch = useDispatch()
  const events = useSelector(state=>state.events);

  useEffect(()=>{
    dispatch(eventActions.getEvents())
  },[dispatch])

  return events && (

      <div className='main-page'>
        <LeftBar/>
        <div className='center-container'>
          <Route exact path='/app'>
            <div className='eventscroll-title'>Upcoming Events</div>
            <div className='center-split'>
              {events && <EventScroll events={events}/>}
              <EventsMap events={events}/>
            </div>
          </Route>
          <Route exact path='/events/:eventId'>
            <EventPage/>
          </Route>
        </div>
        <RightBar/>
      </div>
  )
}
