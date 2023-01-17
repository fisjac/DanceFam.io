import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import * as eventActions from '../../store/events';

import LeftBar from './LeftBar';
import FilterBar from './FilterBar';
import EventPage from './EventPage';
import RightBar from './RightBar';
import EventScroll from './EventScroll';


import './Browser.css'

export default function Browser() {
  const dispatch = useDispatch()
  const events = useSelector(state=>state.events);
  const user = useSelector(state=>state.session.user)

  useEffect(()=>{
    dispatch(eventActions.getEvents())
  },[dispatch])

  return events && (

      <div className='main-page'>
        <LeftBar/>
          <div className='center-container scroll'>
            <FilterBar/>
            <Route exact path='/'>
              {events && <EventScroll events={events}/>}
            </Route>
            <Route exact path='/events/:eventId'>
              <EventPage/>
            </Route>
          </div>
        <RightBar/>
      </div>
  )
}
