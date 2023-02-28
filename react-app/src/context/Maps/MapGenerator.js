import React, {useContext, memo} from 'react'

import VenuesMap from './VenuesMap'
import { GoogleMapsContext } from './MapsLoader'


function MapGenerator(filter=true) {

  const {isLoaded} = useContext(GoogleMapsContext)
    return (
      isLoaded && <VenuesMap zoom={10} filter={filter}/>
    )

};

export default memo(MapGenerator)
