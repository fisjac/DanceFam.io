import React, { useState, useRef, useContext } from 'react'
import {Marker, InfoWindow} from '@react-google-maps/api';
import { GoogleMapsContext } from './MapsLoader';

export default function EventMarker({event}) {
  const anchorRef = useRef(null);
  const {showInfoWindow, setShowInfoWindow, selectedEvent,setSelectedEvent} = useContext(GoogleMapsContext);
  return (
    <>
      <Marker
        key={event.id}
        position={{'lat': event.lat, 'lng':event.lng}}
        ref={anchorRef}
        animation={window.google.maps.Animation.DROP}
        />
      {showInfoWindow && <InfoWindow position={{'lat': event.lat, 'lng':event.lng}}>
        <div>
          {event.name}
        </div>
      </InfoWindow>}


    </>
  )
}
