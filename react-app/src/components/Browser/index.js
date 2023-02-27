import React, { useContext, useState, useMemo } from 'react';
import {  useSelector } from 'react-redux';
import { Route } from 'react-router-dom';


import LeftBar from './LeftBar/';
import RightBar from './RightBar';
import EventScroll from './EventScroll';
import EventsMap from './EventsMap';
import EventSelectionProvider from '../../context/Maps/EventSelector';
import { boundsContext } from '../../context/Maps/Bounds';
import { GoogleMapsContext } from '../../context/Maps/MapsLoader';
import PrivacyPolicy from '../PrivacyPolicy';
import { filterEventsByBounds, filterEventsByStyles, filterEventsByTypes } from '../utils/EventsFilter';

import './Browser.css'

export default function Browser() {
  const events = useSelector(state=>state.events);
  const {bounds} = useContext(boundsContext);
  const {mapIsLoaded} = useContext(GoogleMapsContext);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const types = useSelector(state=>state.types);
  const styles = useSelector(state=>state.styles);

  useMemo(()=>{
    if (mapIsLoaded) {
      let filteredEventsTemp = filterEventsByBounds(events, bounds);
      filteredEventsTemp = filterEventsByTypes(filteredEventsTemp, types);
      filteredEventsTemp = filterEventsByStyles(filteredEventsTemp, styles);
      setFilteredEvents(filteredEventsTemp);
    }
  }, [bounds, styles, types, events])

  return (
      <div className='main-page'>
        <LeftBar styles={styles} types={types}/>
        <div className='center-container'>
          <EventSelectionProvider>
            <div className='eventscroll-title'>Upcoming Events</div>
            <div className='center-split'>
              {events && <EventScroll events={filteredEvents}/>}
              <div className='map-section'>
                <EventsMap events={filteredEvents}/>
              </div>
            </div>
            <Route path='/app/privacy'>
              <PrivacyPolicy/>
            </Route>
          </EventSelectionProvider>
        </div>
        <RightBar/>
      </div>
  )
}
