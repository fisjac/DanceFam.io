import {useEffect, createContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

import {getKey} from '../../store/keys'

import './map.css'


function getLocation (setter) {
  const geoLocationApi = navigator.geolocation;
  if (!geoLocationApi) {
    alert('Geolocation API is not available in your browser!')
  } else {
    geoLocationApi.getCurrentPosition((position)=> {
      const {coords} = position;
      setter({lat: coords.latitude, lng: coords.longitude});
    }, (error) => alert(`There was a problem getting the user's location: ${error.message}`))
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


const libraries = ['places']
export function GoogleMapsApiProvider ({children, apiKey}) {
  const [location, setLocation] = useState('');

  useEffect(()=>{
    if (!location) {
      getLocation(setLocation)
    };
  },[])
  const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries
    });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMapsApiContext.Provider value={{isLoaded, location}}>
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
