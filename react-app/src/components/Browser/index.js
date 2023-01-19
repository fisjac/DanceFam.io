import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import * as eventActions from '../../store/events';

import LeftBar from './LeftBar/';
import EventPage from './EventPage';
import RightBar from './RightBar';
import EventScroll from './EventScroll';
import EventsMap from './EventsMap';

import { boundsContext } from '../../context/Maps/Bounds';
import { filterEventsByBounds } from '../utils/EventsFilter';
import { GoogleMapsContext } from '../../context/Maps/MapsLoader';

import './Browser.css'

export default function Browser() {
  const events = useSelector(state=>state.events);
  const {bounds} = useContext(boundsContext);
  const {mapIsLoaded} = useContext(GoogleMapsContext)
  const [filteredEvents, setFilteredEvents] = useState(null)

  useEffect(()=>{
    if (mapIsLoaded) {
      setFilteredEvents(filterEventsByBounds(events, bounds))
    }
  }, [bounds])

  return (
      <div className='main-page'>
        <LeftBar/>
        <div className='center-container'>
          <Route exact path='/app'>
              <div className='eventscroll-title'>Upcoming Events</div>
              <div className='center-split'>
                {events && <EventScroll events={filteredEvents}/>}
                <EventsMap events={filteredEvents}/>
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
