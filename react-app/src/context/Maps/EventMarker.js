import React, { useState, useRef, useContext, useEffect } from 'react'
import {Marker, InfoWindow} from '@react-google-maps/api';
import { GoogleMapsContext } from './MapsLoader';

import defaultImage from '../../static/dancing_couple1.svg'
import { eventSelectorsContext } from './EventSelector';

export default function EventMarker({event}) {
  const anchorRef = useRef(null);
  const {map} = useContext(GoogleMapsContext);
  const {hoveredEvent, setHoveredEvent, selectedEvent, setSelectedEvent} = useContext(eventSelectorsContext);

  const currentMarker = anchorRef?.current;

  let highlightedEvent
  if (!selectedEvent) {
    highlightedEvent = hoveredEvent
  } else {
    highlightedEvent = selectedEvent
  };

  return (
    <>
      <Marker
        key={event.id}
        position={{'lat': event.lat, 'lng': event.lng}}
        animation={window.google.maps.Animation.DROP}
        ref={anchorRef}
        onClick={()=>{
          map.panTo({'lat': event.lat, 'lng':event.lng});
          setSelectedEvent(event);
        }}
        onMouseOver={(e)=>setHoveredEvent(event)}
        onMouseOut={(e)=>setHoveredEvent(null)}
        onUnmount={()=>{
          console.log('unmounting', event.id)
          if (highlightedEvent?.id === event.id) {
            setSelectedEvent(null);
            setHoveredEvent(null);
          };
        }}
        />
      {highlightedEvent?.id === event.id &&
        <InfoWindow
          onClick={(e)=>{e.stopPropagation()}}
          onCloseClick={()=>setSelectedEvent(null)}
          anchor={currentMarker.marker}
          options={{'disableAutoPan': true}}

          >
            <div className='infowindow-container'>
              <img
                className='infowindow-img'
                src={highlightedEvent.imageUrl===null?defaultImage:highlightedEvent.imageUrl}
                alt="event_img"
                onError={e => e.currentTarget.src = defaultImage}
                />
              <div className='infowindow-details'>
                <div className='infowindow-name'>{event.name}</div>
                {highlightedEvent.externalUrl &&
                  <div
                    className='link'
                    onClick={()=>{
                      window.open(event.externalUrl)
                    }}
                    >
                    Site
                  </div>
                }
              </div>
            </div>
          </InfoWindow>
      }
    </>
  )
}
