import {useEffect, createContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

import {getKey} from '../../store/keys'

import './map.css'




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


  const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries
    });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMapsContext.Provider value={{isLoaded}}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
