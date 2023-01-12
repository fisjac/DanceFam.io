import React from 'react';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const Maps = ({apiKey, center, zoom, events}) => {
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
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

      )}
    </>
  )
};

 {/* <Marker position={{'lat':29.76, 'lng':-95.4}}/> */}

export default React.memo(Maps)
