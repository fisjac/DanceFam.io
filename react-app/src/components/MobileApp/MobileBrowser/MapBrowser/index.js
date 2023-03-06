import React, {useMemo, useContext, useState, useRef} from 'react'
import { useSelector } from 'react-redux';


import Scroll from './Scroll';
import Filters from '../Filters';
import MapGenerator from '../../../../context/Maps/MapGenerator'
import BoundsProvider, { boundsContext } from '../../../../context/Maps/Bounds';
import { GoogleMapsMapContext, GoogleMapsMapProvider } from '../../../../context/Maps/MapsLoader';
import SelectionProvider from '../../../../context/Maps/Selector';
import { filterVenuesByBounds, filterByStyles, filterByTypes, filterEventsByVenues } from '../../../utils/Filters';
import Resizer from './Resizer';

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

  const dragRef = useRef(null)

  const handleResize = (e) => {
    const movementY = e.movementY;
    const resizeContainer = dragRef.current;
    if (!resizeContainer) return;
    const {height} = resizeContainer.getBoundingClientRect();
    resizeContainer.style.height = `${height - movementY}px`
  }

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
          filteredVenuesTemp = filterByStyles(filteredEventsTemp,styles);
          setFilteredEvents(filteredEventsTemp);
        };
      } else {
        setFilteredEvents(events)
        setFilteredVenues(venues)
      };
    };
  }, [bounds, styles, types, events, venues])
  return (
      <SelectionProvider>
        <div className='horizontal-split'>
          <div className='mobile-map-section'>
            <Filters/>
            <MapGenerator type='event' filter={filter}/>
          </div>
          <div
            className='mobile-scroll-section'
            ref={dragRef}
            >
            <Resizer onResize={(e)=>handleResize(e)}/>
            {browserType === 'events' && events && <Scroll data={filteredEvents} scrollType={browserType}/>}
            {browserType === 'venues' && venues && <Scroll data={filteredVenues} scrollType={browserType}/>}
          </div>
        </div>
      </SelectionProvider>
  )
}
