import React, {useContext} from 'react'

import Map from '../../context/Maps/Map'
import { GoogleMapsContext } from '../../context/Maps/MapsLoader'

export default function EventsMap({events}) {
  const {isLoaded} = useContext(GoogleMapsContext)
  return (
    isLoaded && <Map zoom={10} events={events}/>
  )
}
