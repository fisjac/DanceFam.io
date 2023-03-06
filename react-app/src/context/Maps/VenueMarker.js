import React, { useRef, useContext } from 'react'
import {Marker, InfoWindow} from '@react-google-maps/api';

import { GoogleMapsMapContext } from './MapsLoader';
import { SelectorsContext } from './Selector';

export default function VenueMarker({venue}) {
  const anchorRef = useRef(null);
  const {map} = useContext(GoogleMapsMapContext);
  const {hoveredId, setHoveredId, selectedId, setSelectedId, persistSelections} = useContext(SelectorsContext);

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
        ref={anchorRef}
        onClick={()=>{
          map.panTo({'lat': venue.lat, 'lng':venue.lng});
          setSelectedId(venue.id);
        }}
        onMouseOver={(e)=>setHoveredId(venue.id)}
        onMouseOut={(e)=>setHoveredId(null)}
        onUnmount={()=>{
          if (highlightedId === venue.id && !persistSelections) {
            setSelectedId(null);
            setHoveredId(null);
          };
        }}
        />
      {highlightedId === venue.id &&
        <InfoWindow
          onClick={(e)=>{e.stopPropagation()}}
          onCloseClick={()=>setSelectedId(null)}
          anchor={currentMarker?.marker}
          options={{'disableAutoPan': true}}

          >
            <>
            <div style={{'display':'none'}}></div>
            <div className='infowindow-container'>
            <div className='infowindow-details'>
              <div className='infowindow-name'>{venue.name}</div>
              <div>{venue.address},</div>
              <div>{venue.city}, {venue.state}</div>
              {venue.url && <div
                className='link'
                onClick={()=>{
                  window.open(venue.url)
                }}
                >
                Website
              </div>}
              </div>
            </div>
            </>
          </InfoWindow>
      }
    </>
  )
}
