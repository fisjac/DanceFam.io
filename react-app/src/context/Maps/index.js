import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getKey} from '../../store/keys'
import Maps from './Maps';

import './maps.css'

const MapContainer = ({center, zoom, events}) => {
  const key = useSelector(state=>state.keys.maps);
  const dispatch = useDispatch();

  useEffect(()=> {
    if (!key) {
      dispatch(getKey('maps'))
    }
  }, [dispatch,key]);

  if (!key) return null;
  return (
      <Maps id = 'map' apiKey={key} zoom={zoom} center={center} events={events} />
  );
};

export default MapContainer;
