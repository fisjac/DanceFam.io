import React, {useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';

import * as venueActions from '../../../../store/venues';
import * as autocompleteFuncs from '../../../utils/autocomplete';
import SingleVenueMap from './SingleVenueMap';

export default function CreateEventForm({setShowModal}) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [nameSelector, setSelectedName] = useState('');
  const [venue, setVenue] = useState(null);


  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null)
  useEffect(()=> {
    autocompleteFuncs.attachAutoComplete(autoCompleteRef, inputRef);
    autoCompleteRef.current.addListener('place_changed', async function () {
      const data = await autoCompleteRef.current.getPlace();
      const {name, url, location, components} = autocompleteFuncs.parsePlaceData(data)

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
      venueActions.createVenue(venue));
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
          <label>Search for your venue</label>
          <input
            ref={inputRef}
            type='text'
            onChange={(e)=>setSelectedName(e.target.value)}
            value={nameSelector}
            placeholder='Name'
            required
          />
        </div>
        {venue && <div>
          <div className='infowindow-details'>
            <div className='infowindow-name'>{venue.name}</div>
              <div>{venue.address},</div>
              <div>{venue.city}, {venue.state}</div>

              <div
                className='link'
                onClick={()=>{
                  window.open(venue.url)
                }}
                >
                {venue.url}
              </div>
          </div>
        </div>}
        <div className='inline-map'>
          <SingleVenueMap venue={venue}/>
        </div>
        <button
          type='submit'
          className={`submit-button ${!venue?'disabled':''}`}
          disabled={!venue?true:false}
          >Confirm</button>
      </form>
  )
}
