import React, {useState, useEffect} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';


function getLocation (setLocation) {
  const geoLocationApi = navigator.geolocation;
  if (!geoLocationApi) {
    alert('Geolocation API is not available in your browser!')
  } else {
    geoLocationApi.getCurrentPosition((position)=> {
      const {coords} = position;
      setLocation({lat: coords.latitude, lng: coords.longitude});
    }, (error) => alert(`There was a problem getting the user's location: ${error.message}`))
  }
};


const Map = ({zoom, events}) => {
  const [map, setMap] = useState();
  const [location, setLocation] = useState('')
  useEffect(()=> {
    if (!location) {
      getLocation(setLocation)
    }
  },[]);

  return (
      <GoogleMap
        mapContainerClassName='map'
        center={location}
        zoom={zoom}
        onLoad={(map)=>setMap(map)}
        onDragEnd={()=>{
          console.log(map.getBounds())
        }}
        // onZoomChanged={()=>{
        //   console.log(map.getBounds())
        // }}
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
