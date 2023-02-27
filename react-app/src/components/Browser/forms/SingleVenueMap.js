import { useContext } from "react"
import { GoogleMap } from "@react-google-maps/api"
import { GoogleMapsContext } from "../../../context/Maps/MapsLoader"
import VenueMarker from "../../../context/Maps/VenueMarker"

export default function SingleVenueMap({venue}) {
  const {isLoaded, location} = useContext(GoogleMapsContext)
  let center = location
  if (venue) {
  center = {"lat": venue.lat, "lng": venue.lng}
  }
  return (
    isLoaded && <GoogleMap
    mapContainerClassName='map'
    center={center}
    zoom={10.5}
    options={{
      disableDefaultUI: true
    }}
    >
    {venue && <VenueMarker venue={venue}/>}
  </GoogleMap>
  )
};
