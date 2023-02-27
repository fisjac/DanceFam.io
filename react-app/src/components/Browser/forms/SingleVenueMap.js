import { useContext } from "react"
import { GoogleMapsContext } from "../../../context/Maps/MapsLoader"
import Map from "../../../context/Maps/Map"


export default function SingleVenueMap({venues}) {
  const {isLoaded} = useContext(GoogleMapsContext)
  return (
    isLoaded && <Map zoom={10}/>
  )
};
