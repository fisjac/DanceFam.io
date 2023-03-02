import React, {useState, useEffect, useContext, useMemo} from 'react';
import {GoogleMap} from '@react-google-maps/api';

import { boundsContext } from './Bounds';
import VenueMarker from './VenueMarker';
import { GoogleMapsApiContext, GoogleMapsMapContext } from './MapsLoader';
import { useSelector } from 'react-redux';

import { filterByStyles, filterByTypes, filterVenuesByBounds } from '../../components/utils/Filters';

const VenuesMap = ({zoom, filter}) => {
  const venues = useSelector(state=>state.venues);
  const styles = useSelector(state=>state.styles);
  const types = useSelector(state=>state.types);

  const {location} = useContext(GoogleMapsApiContext);
  const {setMapIsLoaded, map, setMap} = useContext(GoogleMapsMapContext)

  const {bounds, setBounds} = useContext(boundsContext);
  const [filteredVenues, setFilteredVenues] = useState(null);

  useMemo(()=>{
    if (filter === true) {
      let filteredVenuesTemp = filterVenuesByBounds(venues, bounds)
      filteredVenuesTemp = filterByTypes(filteredVenuesTemp, types);
      filteredVenuesTemp = filterByStyles(filteredVenuesTemp, styles);
      setFilteredVenues(filteredVenuesTemp);
    } else {
      setFilteredVenues(venues)
    }
    }, [ bounds, styles, types, venues, filter ])

    return (
      <GoogleMap
        mapContainerClassName='map'
        center={location}
        zoom={zoom}
        onLoad={(map)=>{
          setMap(map);
          setMapIsLoaded(true);
        }}
        onBoundsChanged={()=>{
          setBounds(map.getBounds())
        }}
        options={{
          disableDefaultUI: true
        }}
        >
        {filteredVenues && Object.values(filteredVenues).map((venue)=> {
          return <VenueMarker venue={venue}/>
        })}
      </GoogleMap>
  )
};

export default React.memo(VenuesMap)
