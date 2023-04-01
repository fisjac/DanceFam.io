import React, {useMemo, useContext, useState, createRef, useEffect} from 'react'
import { useSelector } from 'react-redux';


import Scroll from './Scroll'
import MapGenerator from '../../../../../context/Maps/MapGenerator'
import BoundsProvider, { boundsContext } from '../../../../../context/Maps/Bounds';
import { GoogleMapsMapContext, GoogleMapsMapProvider, LocationProvider } from '../../../../../context/Maps/MapsLoader';
import { filterVenuesByBounds } from '../../../../utils/Filters';

import './ModalMapBrowser.css'

export default function BoundsLinkedBrowser () {
  return (
    <BoundsProvider>
      <LocationProvider>
        <GoogleMapsMapProvider>
          <MapBrowser/>
        </GoogleMapsMapProvider>
      </LocationProvider>
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
  }, [mapIsLoaded, bounds, venues])

  return (
        <div className='modal-center-split__mobile'
        >
          { venues && <Scroll data={filteredVenues}/>}
          <div className='modal-map-section__mobile'
          >
            <MapGenerator filter={false}/>
          </div>
        </div>
  )
}
