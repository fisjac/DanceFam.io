import {useEffect, createContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadScript } from '@react-google-maps/api';

import {getKey} from '../../store/keys'

import './map.css'


export const GoogleMapsContext = createContext();


export function GoogleMapsProvider ({children}) {
  const dispatch = useDispatch();
  const key = useSelector(state=>state.keys.places)


  useEffect(()=> {
    if (!key) dispatch(getKey('places'))
  })

  const {isLoaded} = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: key,
    libraries: ['places']
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMapsContext.Provider value={{key, isLoaded}}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
