import React, { useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';


import * as eventActions from '../../../store/events';
import * as dateFuncs from '../../utils/DateFuncs';
import * as autocompleteFuncs from '../../utils/autocomplete';

export default function EditEventForm({event, setShowModal}) {
  const dispatch = useDispatch();

  let [startDateString, startTimeString] = dateFuncs.splitDatetime(event.start);
  let [endDateString, endTimeString] = dateFuncs.splitDatetime(event.end);

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(event.name);
  const [startDate, setStartDate] = useState(startDateString);
  const [startTime, setStartTime] = useState(startTimeString);
  const [endDate, setEndDate] = useState(endDateString);
  const [endTime, setEndTime] = useState(endTimeString);
  const [address, setAddress] = useState(event.address);
  const [city, setCity] = useState(event.city);
  const [state, setState] = useState(event.state);
  const [country, setCountry] = useState(event.country);
  const [lat, setLat] = useState(event.lat);
  const [lng, setLng] = useState(event.lng);
  const [externalUrl, setExternalUrl] = useState(event.externalUrl);
  const [imageUrl, setImageUrl] = useState(event.imageUrl);
  const [types, setTypes] = useState(event.types);
  const [styles, setStyles] = useState(event.styles);

  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null)
  useEffect(()=> {
    autocompleteFuncs.attachAutoComplete(autoCompleteRef, inputRef);
    autoCompleteRef.current.addListener('place_changed', async function () {
      const data = await autoCompleteRef.current.getPlace();
      const {location, components} = autocompleteFuncs.parsePlaceData(data)

      components.street_number ?
        setAddress(components.street_number + ' ' + components.route) :
        setAddress(components.route)
      setCity(components.locality)
      setState(components.administrative_area_level_1)
      setCountry(components.country)
      setLat(location.lat)
      setLng(location.lng)
    })
  }, [])

  if (event) {

    const handleSubmit = async (e) => {
      e.preventDefault();
      const start = new Date(startDate + 'T' + startTime + ':00.000Z');
      const end = new Date(endDate + 'T' + endTime + ':00.000Z');
      const body = {
        id: event.id,
        name,
        start: dateFuncs.dateToBackendFormat(start),
        end: dateFuncs.dateToBackendFormat(end),
        address,
        city,
        state,
        country,
        lat,
        lng,
        external_url: externalUrl?externalUrl:null,
        image_url: imageUrl?imageUrl:null,
      };
      const response = await dispatch(
        eventActions.updateEvent(body));
      if (response.ok) {
        setShowModal(false)
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
          <label>Event Name *</label>
          <input
            type='text'
            onChange={(e)=>setName(e.target.value)}
            value={name}
            placeholder='Name'
            required
            />
        </div>
        <div className='datetime-input'>
          <label>Start *</label>
          <input
            type='Date'
            min={dateFuncs.dateToday()}
            max={endDate}
            onChange={(e)=>setStartDate(e.target.value)}
            value={startDate}
            required
            />
          <input
            className='time-input'
            type='Time'
            onChange={(e)=>setStartTime(e.target.value)}
            value={startTime}
            required
            />
        </div>
        <div className='datetime-input'>
        <label>End *</label>
          <input
              type='Date'
              min={startDate}
              onChange={(e)=>setEndDate(e.target.value)}
              value={endDate}
              required
              />
            <input
              type='Time'
              className='time-input'
              onChange={(e)=>setEndTime(e.target.value)}
              value={endTime}
              required
              />
        </div>
        <div>
          <label>Address *</label>
          <input
            type='text'
            onChange={(e)=>setAddress(e.target.value)}
            value={address}
            ref={inputRef}
            required
            />
        </div>
        <div>
          <label>City</label>
          <input
            type='text'
            onChange={(e)=>setCity(e.target.value)}
            value={city}
            required
            />
        </div>
        <div>
          <label>State *</label>
          <input
            type='text'
            onChange={(e)=>setState(e.target.value)}
            value={state}
            required
            />
        </div>
        <div>
          <label>Country *</label>
          <input
            type='text'
            onChange={(e)=>setCountry(e.target.value)}
            value={country}
            required
            />
        </div>
        <div>
          <label>Event Page</label>
          <input
            type='text'
            onChange={(e)=>setExternalUrl(e.target.value)}
            value={externalUrl}
            />
        </div>
        <div>
        <label>Image Url</label>
        <input
          type='text'
          onChange={(e)=>setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder='Image Url'
          />
      </div>

        <button type='submit'>Confirm</button>
      </form>
    )
  }
}
