import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';


import * as eventActions from '../../../store/events';

function splitDatetime (dateString) {
  const dateTime = new Date(dateString);
  let [date, time] = dateTime.toISOString().split('T');
  time = time.substring(0,8)
  return [date, time];
};

export default function EditEventForm({event, setShowModal}) {
  const dispatch = useDispatch();

  let [startDateString, startTimeString] = splitDatetime(event.start);
  let [endDateString, endTimeString] = splitDatetime(event.end);

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
  const [description, setDescription] = useState(event.description);
  const [imageUrl, setImageUrl] = useState(event.imageUrl);
  if (event) {

    const dateToBackendFormat = (date) => {
      let dateString = date.toISOString();
      return dateString.replace('T', ' ').substring(0,dateString.length - 5)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const start = new Date(startDate + 'T' + startTime);
      const end = new Date(startDate + 'T' + startTime);
      const body = {
        id: event.id,
        name,
        start: dateToBackendFormat(start),
        end: dateToBackendFormat(end),
        address,
        city,
        state,
        country,
        description,
        image_url: imageUrl,
      };
      const response = await dispatch(
        eventActions.updateEvent(body));
      if (response.ok) {
        setShowModal(false)
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
          <label>Description *</label>
          <textarea
            className='textarea-input'
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            required
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
