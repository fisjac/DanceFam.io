import React, {useContext, memo} from 'react'

import VenuesMap from './VenuesMap'
import { GoogleMapsApiContext } from './MapsLoader'

function MapGenerator({filter}) {

  const {isLoaded} = useContext(GoogleMapsApiContext)
    return (
      isLoaded && <VenuesMap zoom={5} filter={filter}/>
    )

};

export default memo(MapGenerator)
