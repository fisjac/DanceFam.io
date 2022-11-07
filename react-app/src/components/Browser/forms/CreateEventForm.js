import React, {useState} from 'react'
import { useDispatch } from 'react-redux';


import * as eventActions from '../../../store/events';

export default function CreateEventForm({communityId, setShowModal}) {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();
  const dateToBackendFormat = (date) => {
    let dateString = date.toISOString();
    return dateString.replace('T', ' ').substring(0,dateString.length - 5)
  }

  const dateToday = (date = new Date()) => {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2,0),
        String(date.getDate()).padStart(2,0),
    ].join('-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(startDate + 'T' + startTime);
    const end = new Date(endDate + 'T' + endTime);
    const response = await dispatch(
      eventActions.createEvent({
        communityId,
        event: {
          name,
          start: dateToBackendFormat(start),
          end: dateToBackendFormat(end),
          address,
          city,
          state,
          country,
          description,
          image_url: imageUrl,}
        }));
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
          min={dateToday()}
          max={endDate}
          onChange={(e)=>setStartDate(e.target.value)}
          value={startDate}
          required
        />
        <input
          type='Time'
          max={startTime}
          className='time-input'
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
          className='time-input'
          type='Time'
          min={startTime}
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
        <label>City *</label>
        <input
          type='text'
          onChange={(e)=>setCity(e.target.value)}
          value={city}
          required
        />
      </div>
      <div>
        <label>State</label>
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
          type='textarea'
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
