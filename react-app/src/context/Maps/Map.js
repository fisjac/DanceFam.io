import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap} from '@react-google-maps/api';

import { boundsContext } from './Bounds';
import EventMarker from './EventMarker';
import { GoogleMapsContext } from './MapsLoader';
import { useSelector } from 'react-redux';

const Map = ({zoom}) => {
  const {location, setMapIsLoaded, map, setMap} = useContext(GoogleMapsContext);
  const {setBounds} = useContext(boundsContext);
  const events = useSelector(state=>state.events)

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
        {events && Object.values(events).map((event)=> {
          return <EventMarker event={event}/>
        })}
      </GoogleMap>
  )
};

export default React.memo(Map)
