import React, {useMemo, useContext, useState} from 'react'
import { useSelector } from 'react-redux';


import EventScroll from './EventScroll'
import MapGenerator from '../../../context/Maps/MapGenerator'
import BoundsProvider, { boundsContext } from '../../../context/Maps/Bounds';
import { GoogleMapsContext } from '../../../context/Maps/MapsLoader';
import SelectionProvider from '../../../context/Maps/Selector';
import { filterVenuesByBounds, filterByStyles, filterByTypes, filterEventsByVenues } from '../../utils/Filters';

export default function BoundsLinkedBrowser ({browserType}) {
  return (
    <BoundsProvider>
      <MapBrowser browserType={browserType}/>
    </BoundsProvider>
  )
}

export function MapBrowser({browserType}) {
  const events = useSelector(state=>state.events);
  const venues = useSelector(state=>state.venues);
  const types = useSelector(state=>state.types);
  const styles = useSelector(state=>state.styles);

  const {bounds} = useContext(boundsContext);
  const {mapIsLoaded} = useContext(GoogleMapsContext);

  const [filteredEvents, setFilteredEvents] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState(null);


  useMemo(()=>{
    if (mapIsLoaded) {
          let filteredVenuesTemp = filterVenuesByBounds(venues,bounds);
          filteredVenuesTemp = filterByTypes(filteredVenuesTemp, types);
          filteredVenuesTemp = filterByStyles(filteredVenuesTemp, styles);
          setFilteredVenues(filteredVenuesTemp);
          if (browserType==='event') {
            let filteredEventsTemp = filterEventsByVenues(events,venues);
            filteredEventsTemp = filterByTypes(events,types);
            filteredVenuesTemp = filterByStyles(events,styles);
            setFilteredEvents(filteredEventsTemp);
          }

    }
  }, [bounds, styles, types, events])

  return (
      <SelectionProvider>
        <div className='eventscroll-title'>Upcoming Events</div>
        <div className='center-split'>
          {events && <EventScroll events={filteredEvents}/>}
          <div className='map-section'>
            <MapGenerator type='event'/>
          </div>
        </div>
      </SelectionProvider>
  )
}
