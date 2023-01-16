import {useEffect, createContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

import {getKey} from '../../store/keys'

import './map.css'


function getLocation (setLocation) {
  const geoLocationApi = navigator.geolocation;
  if (!geoLocationApi) {
    alert('Geolocation API is not available in your browser!')
  } else {
    geoLocationApi.getCurrentPosition((position)=> {
      const {coords} = position;
      setLocation({lat: coords.latitude, lng: coords.longitude});
    }, (error) => alert(`There was a problem getting the user's location: ${error.message}`))
  }
};

export const GoogleMapsContext = createContext();

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
    <GoogleMapsProvider apiKey={key}>
      {children}
    </GoogleMapsProvider>
  );
};


const libraries = ['places']
export function GoogleMapsProvider ({children, apiKey}) {

  const [location, setLocation] = useState({lat: 29.76, lng: -95.41})
  useEffect(()=> {
    getLocation(setLocation)
  },[]);

  const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries
    });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMapsContext.Provider value={{isLoaded, location}}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
