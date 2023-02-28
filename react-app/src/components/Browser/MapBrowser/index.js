import React, {useMemo, useContext, useState} from 'react'
import { useSelector } from 'react-redux';


import Scroll from './Scroll'
import MapGenerator from '../../../context/Maps/MapGenerator'
import BoundsProvider, { boundsContext } from '../../../context/Maps/Bounds';
import { GoogleMapsMapContext, GoogleMapsMapProvider } from '../../../context/Maps/MapsLoader';
import SelectionProvider from '../../../context/Maps/Selector';
import { filterVenuesByBounds, filterByStyles, filterByTypes, filterEventsByVenues } from '../../utils/Filters';

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
        filteredVenuesTemp = filterByTypes(filteredVenuesTemp, types);
        filteredVenuesTemp = filterByStyles(filteredVenuesTemp, styles);
        setFilteredVenues(filteredVenuesTemp);
        if (browserType==='event') {
          let filteredEventsTemp = filterEventsByVenues(events,venues);
          filteredEventsTemp = filterByTypes(events,types);
          filteredVenuesTemp = filterByStyles(events,styles);
          setFilteredEvents(filteredEventsTemp);
        };
      } else {
        setFilteredEvents(events)
        setFilteredVenues(venues)
      };
    };
  }, [bounds, styles, types, events])

  return (
      <SelectionProvider>
        <div className='center-split'>
          {browserType === 'events' && events && <Scroll data={filteredEvents} scrollType={browserType}/>}
          {browserType === 'venues' && venues && <Scroll data={filteredVenues} scrollType={browserType}/>}
          <div className='map-section'>
            <MapGenerator type='event' filter={filter}/>
          </div>
        </div>
      </SelectionProvider>
  )
}
