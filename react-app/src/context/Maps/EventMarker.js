import React, { useState, useRef, useContext, useEffect } from 'react'
import {Marker, InfoWindow} from '@react-google-maps/api';
import { GoogleMapsContext } from './MapsLoader';

export default function EventMarker({event}) {
  const anchorRef = useRef(null);
  const {hoveredEvent, showInfoWindow, setShowInfoWindow, selectedEvent} = useContext(GoogleMapsContext);

  let animation
  if (hoveredEvent) {
    if (hoveredEvent.id === event.id) {
      if (selectedEvent?.id === event.id) {
        animation = null;
      } else {
        animation = window.google.maps.Animation.BOUNCE;
      };
    }
  } else {
    if (animation) {
      animation = null
    }
  };
  const currentMarker = anchorRef.current
  return (
    <>
      <Marker
        key={event.id}
        position={{'lat': event.lat, 'lng':event.lng}}
        ref={anchorRef}
        animation={animation}

        />
      {showInfoWindow && selectedEvent.id === event.id &&
        <InfoWindow
          onCloseClick={()=>setShowInfoWindow(false)}
          anchor={currentMarker.marker}
          >
          <div>
            {
            event.name
            }
          </div>
        </InfoWindow>
        }


    </>
  )
}
