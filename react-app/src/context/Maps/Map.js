import React, {useState, useEffect, useContext, useMemo} from 'react';
import {GoogleMap} from '@react-google-maps/api';

import { boundsContext } from './Bounds';
import EventMarker from './EventMarker';
import { GoogleMapsContext } from './MapsLoader';
import { useSelector } from 'react-redux';

import { filterEventsByStyles, filterEventsByTypes } from '../../components/utils/EventsFilter';

const Map = ({zoom}) => {
  const events = useSelector(state=>state.events);
  const styles = useSelector(state=>state.styles);
  const types = useSelector(state=>state.types);
  const {location, setMapIsLoaded, map, setMap} = useContext(GoogleMapsContext);

  const {setBounds} = useContext(boundsContext);
  const [filteredEvents, setFilteredEvents] = useState(null);

  useMemo(()=>{
      let filteredEventsTemp = filterEventsByTypes(events, types);
      filteredEventsTemp = filterEventsByStyles(filteredEventsTemp, styles);
      setFilteredEvents(filteredEventsTemp);
    }, [ styles, types, events])

  return (
      <GoogleMap
        mapContainerClassName='map'
        center={location}
        zoom={zoom}
        onLoad={(map)=>{
          setMap(map);
          setMapIsLoaded(true);
        }}
        onBoundsChanged={()=>{
          setBounds(map.getBounds())
        }}
        options={{
          disableDefaultUI: true
        }}
        >
        {filteredEvents && Object.values(filteredEvents).map((event)=> {
          return <EventMarker event={event}/>
        })}
      </GoogleMap>
  )
};

export default React.memo(Map)
