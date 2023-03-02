import React, { useContext } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { GoogleMapsApiContext } from "../../../context/Maps/MapsLoader"

function SingleVenueMap({venue}) {
  const {isLoaded, location} = useContext(GoogleMapsApiContext)
  let center = location
  if (venue) {
  center = {"lat": venue.lat, "lng": venue.lng}
  }
  return (
    isLoaded && <GoogleMap
    mapContainerClassName='map'
    center={center}
    zoom={10}
    options={{
      disableDefaultUI: true

    }}
    >
    {venue && <Marker position={{'lat': venue.lat, 'lng': venue.lng}}/>}
  </GoogleMap>
  )
};

export default React.memo(SingleVenueMap)
