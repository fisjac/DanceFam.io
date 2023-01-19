import React, {useState, useEffect, useContext} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';

import { boundsContext } from './Bounds';
import { GoogleMapsContext } from './MapsLoader';

const Map = ({zoom, events}) => {
  const {location, setMapIsLoaded} = useContext(GoogleMapsContext);
  const {bounds, setBounds} = useContext(boundsContext);
  const [map, setMap] = useState();

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
          return <Marker key={event.id} position={{'lat': event.lat, 'lng':event.lng}}/>
        })}
      </GoogleMap>
  )
};

export default React.memo(Map)
