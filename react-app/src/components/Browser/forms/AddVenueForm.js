import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as eventActions from '../../../store/events';
import * as autocompleteFuncs from '../../utils/autocomplete';
import SingleVenueMap from './SingleVenueMap';
import { GoogleMapsProvider } from '../../../context/Maps/MapsLoader';

export default function CreateEventForm({setShowModal}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [venue, setVenue] = useState(null);


  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null)
  useEffect(()=> {
    autocompleteFuncs.attachAutoComplete(autoCompleteRef, inputRef);
    autoCompleteRef.current.addListener('place_changed', async function () {
      const data = await autoCompleteRef.current.getPlace();
      const {name, url, location, components} = autocompleteFuncs.parsePlaceData(data)

      setName(name)
      setVenue({
        name,
        url,
        address:  components.street_number ?
          components.street_number + ' ' + components.route :
          components.route,
        city: components.locality,
        state: components.administrative_area_level_1,
        country: components.country,
        lat: location.lat,
        lng: location.lng,
      })
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
        <div className='inline-map'>
          <SingleVenueMap venue={venue}/>
        </div>
        <button
          type='submit'
          className='disabled'
          disabled={!venue?true:false}
          >Confirm</button>
      </form>
  )
}
