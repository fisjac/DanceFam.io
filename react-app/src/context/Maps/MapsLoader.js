import {useEffect, createContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

import {getKey} from '../../store/keys'

import './map.css'


function getLocation (setter) {
  const storedLocation = JSON.parse(localStorage.getItem('location'));
  if (storedLocation) {
    setter(storedLocation);
    return
  };
  const geoLocationApi = navigator.geolocation;
  if (!geoLocationApi) {
    alert('Geolocation API is not available in your browser!')
  } else {
    geoLocationApi.getCurrentPosition((position)=> {
      const {coords} = position;
      setter({lat: coords.latitude, lng: coords.longitude});
      localStorage.setItem('location', JSON.stringify({lat: coords.latitude, lng: coords.longitude}))
    }, (error) => {
      alert(`There was a problem getting the user's location: ${error.message}`)
      setter({lat:37.412079, lng:-99.703732})
  })
  }
};

// Context for loaded state of Google Maps API (happens once)
export const GoogleMapsApiContext = createContext();

export default function LoadMaps({children}) {
  const key = useSelector(state=>state.keys.places);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }
  return (
    <GoogleMapsApiProvider apiKey={key}>
      {children}
    </GoogleMapsApiProvider>
  );
};

export const LocationContext = createContext()
export function LocationProvider ({children}) {
  const [location, setLocation] = useState('');
  useEffect(()=>{
    if (!location) {
      getLocation(setLocation)
    };
  },[])
  return (
    <LocationContext.Provider value={{location, setLocation}}>
      {children}
    </LocationContext.Provider>
  )
}

export function GoogleMapsApiProvider ({children, apiKey}) {
  const libraries = ['places']
  const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries
    });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMapsApiContext.Provider value={{isLoaded}}>
      {children}
    </GoogleMapsApiContext.Provider>
  );
};

// Context for passing map objects (is set on creation of the individual map)
export const GoogleMapsMapContext = createContext();

export function GoogleMapsMapProvider ({children}) {
  const [mapIsLoaded, setMapIsLoaded] = useState(false);
  const [map, setMap] = useState(null);

  return (
    <GoogleMapsMapContext.Provider value={{mapIsLoaded, setMapIsLoaded, map,setMap}}>
      {children}
    </GoogleMapsMapContext.Provider>
  )
};
