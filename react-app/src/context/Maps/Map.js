import React from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';

const Map = ({center, zoom, events}) => {


  return (
    <GoogleMap
      id='map'
      center={center}
      zoom={zoom}
      >
      {Object.values(events).map((event, id)=> {
        id={id}
        return <Marker position={{'lat': event.lat, 'lng':event.lng}}/>
      })}
    </GoogleMap>
  )
};

export default React.memo(Map)
