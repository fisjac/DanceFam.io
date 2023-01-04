import { React, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { getKey } from '../../store/maps';

import './maps.css'

const Map = (props) => {
  const mapsRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapsRef.current && !map) {
      setMap(new window.google.maps.Map(mapsRef.current, {
        zoom: 3,
        center: {lat: 0, lng: 0}
      }));
    }
  }, [mapsRef, map]);
  console.log('current ref', mapsRef.current)
  return (
      <div id='map' ref={mapsRef}/>
  )
};


export default function GMap () {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  const render = (status= Status) => {
    return <h1>{status}</h1>;
  };

  return key && (
    <Wrapper apiKey={key} render={render}>
      <Map/>
    </Wrapper>
  );
};
