import React, { useRef } from 'react'
import {Marker, InfoWindow} from '@react-google-maps/api';


export default function VenueMarker({venue}) {
  const anchorRef = useRef(null);
  const currentMarker = anchorRef?.current;
  {console.log(anchorRef)}

  return (
    <>
      <Marker
        position={{'lat': venue.lat, 'lng': venue.lng}}
        ref={anchorRef}
        />
        <InfoWindow
          anchor={currentMarker?.marker}

          >
            <div className='infowindow-container'>
              <div className='infowindow-details'>
                <div className='infowindow-name'>{venue.name}</div>
                  <div
                    className='link'
                    onClick={()=>{
                      window.open(venue.url)
                    }}
                    >
                    Website
                  </div>
              </div>
            </div>
          </InfoWindow>
    </>
  )
}
