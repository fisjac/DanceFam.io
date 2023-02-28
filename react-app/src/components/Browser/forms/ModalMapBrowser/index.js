import React, {useMemo, useContext, useState} from 'react'
import { useSelector } from 'react-redux';


import Scroll from './Scroll'
import MapGenerator from '../../../../context/Maps/MapGenerator'
import BoundsProvider, { boundsContext } from '../../../../context/Maps/Bounds';
import { GoogleMapsMapContext, GoogleMapsMapProvider } from '../../../../context/Maps/MapsLoader';
import { filterVenuesByBounds } from '../../../utils/Filters';

import './ModalMapBrowser.css'

export default function BoundsLinkedBrowser () {
  return (
    <BoundsProvider>
      <GoogleMapsMapProvider>
        <MapBrowser/>
      </GoogleMapsMapProvider>
    </BoundsProvider>
  );
};

export function MapBrowser() {
  const venues = useSelector(state=>state.venues);
  const {bounds} = useContext(boundsContext);
  const {mapIsLoaded} = useContext(GoogleMapsMapContext);

  const [filteredVenues, setFilteredVenues] = useState(null);


  useMemo(()=>{
    if (mapIsLoaded) {
        setFilteredVenues(filterVenuesByBounds(venues,bounds));
        };
  }, [bounds,venues])

  return (
        <div className='modal-center-split'>
          { venues && <Scroll data={filteredVenues}/>}
          <div className='modal-map-section'>
            <MapGenerator filter={false}/>
          </div>
        </div>
  )
}
