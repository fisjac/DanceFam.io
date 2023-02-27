import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as eventActions from '../../../store/events';
import * as dateFuncs from '../../utils/DateFuncs';
import * as autocompleteFuncs from '../../utils/autocomplete';
import SingleVenueMap from './SingleVenueMap';

export default function CreateEventForm({setShowModal}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [url, setUrl] = useState('');
  const venue = {
    name,
    address,
    city,
    state,
    country,
    lat,
    lng,
    url,
  };


  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null)
  useEffect(()=> {
    autocompleteFuncs.attachAutoComplete(autoCompleteRef, inputRef);
    autoCompleteRef.current.addListener('place_changed', async function () {
      const data = await autoCompleteRef.current.getPlace();
      const {name, url, location, components} = autocompleteFuncs.parsePlaceData(data)

      components.street_number ?
        setAddress(components.street_number + ' ' + components.route) :
        setAddress(components.route)
      setCity(components.locality)
      setState(components.administrative_area_level_1)
      setCountry(components.country)
      setLat(location.lat)
      setLng(location.lng)
      setName(name)
      setUrl(url)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      eventActions.createEvent({venue: venue}));
    if (response.ok) {
      setShowModal(false);
      setErrors([]);
    } else {
      const data = await response.json()
      setErrors(data.errors)
    };
  };

  return (
      <form method='POST' onSubmit={handleSubmit}>
        <div className='errors'>
          {errors.map((error, idx) => (
            <div className='error' key={idx}>{error}</div>
          ))}
        </div>
        <div>
          <label>Name *</label>
          <input
            ref={inputRef}
            type='text'
            onChange={(e)=>setName(e.target.value)}
            value={name}
            placeholder='Name'
            required
          />
        </div>
        <SingleVenueMap venues={[venue]}/>
        <button
          type='submit'
          // className='disabled'
          // disabled={true}
          >Confirm</button>
      </form>
  )
}
