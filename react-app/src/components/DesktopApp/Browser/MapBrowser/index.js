import React, {useMemo, useContext, useState} from 'react'
import { useSelector } from 'react-redux';


import Scroll from './Scroll';
import Filters from '../Filters';
import MapGenerator from '../../../../context/Maps/MapGenerator'
import BoundsProvider, { boundsContext } from '../../../../context/Maps/Bounds';
import { GoogleMapsMapContext, GoogleMapsMapProvider } from '../../../../context/Maps/MapsLoader';
import SelectionProvider from '../../../../context/Maps/Selector';
import { filterVenuesByBounds, filterByStyles, filterByTypes, filterEventsByVenues, filterVenuesByEvents } from '../../../utils/Filters';

export default function BoundsLinkedBrowser ({browserType, filter=true}) {
  return (
    <BoundsProvider>
      <GoogleMapsMapProvider>
      <MapBrowser browserType={browserType} filter={filter}/>
      </GoogleMapsMapProvider>
    </BoundsProvider>
  );
};

export function MapBrowser({browserType, filter}) {
  const events = useSelector(state=>state.events);
  const venues = useSelector(state=>state.venues);
  const types = useSelector(state=>state.types);
  const styles = useSelector(state=>state.styles);
  const {bounds} = useContext(boundsContext);
  const {mapIsLoaded} = useContext(GoogleMapsMapContext);

  const [filteredEvents, setFilteredEvents] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState(null);


  useMemo(()=>{

    if (mapIsLoaded) {
      if (filter) {
        let filteredVenuesTemp = filterVenuesByBounds(venues,bounds);
        filteredVenuesTemp = filterByStyles(filteredVenuesTemp, styles);
        filteredVenuesTemp = filterByTypes(filteredVenuesTemp, types);
        setFilteredVenues(filteredVenuesTemp);
        if (browserType==='events') {
          let filteredEventsTemp = filterEventsByVenues(events,filteredVenuesTemp);
          filteredEventsTemp = filterByTypes(filteredEventsTemp, types,'events');
          filteredEventsTemp = filterByStyles(filteredEventsTemp,styles);
          setFilteredEvents(filteredEventsTemp);
          setFilteredVenues(filterVenuesByEvents(filteredEventsTemp, filteredVenuesTemp))
        };
      } else {
        setFilteredEvents(events)
        setFilteredVenues(venues)
      };
    };
  }, [mapIsLoaded, filter, browserType, bounds, styles, types, events, venues])
  return (
      <SelectionProvider>
        <div className='center-split'>
          <div className='scroll-section'>
            <div className='eventscroll-title'>Upcoming Events</div>
            {browserType === 'events' && events && <Scroll data={filteredEvents} scrollType={browserType}/>}
            {browserType === 'venues' && venues && <Scroll data={filteredVenues} scrollType={browserType}/>}
          </div>

          <div className='map-section'>
            <Filters/>
            <MapGenerator type='event' filter={filter}/>
          </div>
        </div>
      </SelectionProvider>
  )
}
