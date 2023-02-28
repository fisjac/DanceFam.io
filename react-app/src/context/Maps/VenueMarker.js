import React, { useRef, useContext } from 'react'
import {Marker, InfoWindow} from '@react-google-maps/api';

import { GoogleMapsContext } from './MapsLoader';
import { SelectorsContext } from './Selector';

export default function VenueMarker({venue}) {
  const anchorRef = useRef(null);
  const {map} = useContext(GoogleMapsContext);
  const {hoveredId, setHoveredId, selectedId, setSelectedId} = useContext(SelectorsContext);

  const currentMarker = anchorRef?.current;

  let highlightedId
  if (!selectedId) {
    highlightedId = hoveredId
  } else {
    highlightedId = selectedId
  };

  return (
    <>
      <Marker
        key={venue.id}
        position={{'lat': venue.lat, 'lng': venue.lng}}
        // animation={window.google.maps.Animation.DROP}
        ref={anchorRef}
        onClick={()=>{
          map.panTo({'lat': venue.lat, 'lng':venue.lng});
          setSelectedId(venue.id);
        }}
        onMouseOver={(e)=>setHoveredId(venue.id)}
        onMouseOut={(e)=>setHoveredId(null)}
        onUnmount={()=>{
          if (highlightedId === venue.id) {
            setSelectedId(null);
            setHoveredId(null);
          };
        }}
        />
      {highlightedId === venue.id &&
        <InfoWindow
          onClick={(e)=>{e.stopPropagation()}}
          onCloseClick={()=>setSelectedId(null)}
          anchor={currentMarker.marker}
          options={{'disableAutoPan': true}}

          >
            <div className='infowindow-container'>
            <div className='infowindow-details'>
              <div className='infowindow-name'>{venue.name}</div>
              <div>{venue.address},</div>
              <div>{venue.city}, {venue.state}</div>
              <div
                className='link'
                onClick={()=>{
                  window.open(venue.url)
                }}
                >
                {venue.url}
              </div>
              </div>
            </div>
          </InfoWindow>
      }
    </>
  )
}
