import React, {useContext, memo} from 'react'

import Map from '../../context/Maps/Map'
import { GoogleMapsContext } from '../../context/Maps/MapsLoader'


function EventsMap({events}) {

  const {isLoaded} = useContext(GoogleMapsContext)
  return (
    isLoaded && <Map zoom={10}/>
  )
}

export default memo(EventsMap)
