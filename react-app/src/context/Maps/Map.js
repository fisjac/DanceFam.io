import React from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';

const Map = ({center, zoom, events}) => {


  return (
    <GoogleMap
      mapContainerClassName='map'
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: true
      }}
      >
      {Object.values(events).map((event)=> {
        return <Marker key={event.id} position={{'lat': event.lat, 'lng':event.lng}}/>
      })}
    </GoogleMap>
  )
};

export default React.memo(Map)
