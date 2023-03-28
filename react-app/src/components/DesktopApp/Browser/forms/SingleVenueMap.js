import React, { useContext } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { GoogleMapsApiContext, LocationContext } from "../../../../context/Maps/MapsLoader"

function SingleVenueMap({venue}) {
  const {isLoaded} = useContext(GoogleMapsApiContext)
  const {location} = useContext(LocationContext);
  let center = location
  if (venue) {
  center = {"lat": venue.lat, "lng": venue.lng}
  }
  return (
    isLoaded && <GoogleMap
    mapContainerClassName='map'
    center={center}
    zoom={5}
    options={{
      disableDefaultUI: true

    }}
    >
    {venue && <Marker position={{'lat': venue.lat, 'lng': venue.lng}}/>}
  </GoogleMap>
  )
};

export default React.memo(SingleVenueMap)
