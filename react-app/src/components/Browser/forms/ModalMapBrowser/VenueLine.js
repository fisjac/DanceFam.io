import React, { useContext } from 'react'

import { GoogleMapsMapContext } from '../../../../context/Maps/MapsLoader';
import { SelectorsContext } from '../../../../context/Maps/Selector';


export default function VenueLine({venue}) {
  const { map } = useContext(GoogleMapsMapContext);
  const { setHoveredId, setSelectedId} = useContext(SelectorsContext);

  return (
    <>
      <div
        className='modal-eventline-container'
        onClick={(e)=>{
            e.preventDefault()
            setSelectedId(venue.id);
            map.panTo({lat: venue.lat, lng: venue.lng});
        }}
        onMouseEnter={()=>setHoveredId(venue.id)}
        onMouseLeave={()=> setHoveredId(null)}
        >
        <div className='modal-eventline-body'>
          <div className='modal-eventline-details'>
            <div className='eventline-name'>{venue.name}</div>
            {/* add in venue details */}
          </div>
        </div>
      </div>
    </>
  )
}
