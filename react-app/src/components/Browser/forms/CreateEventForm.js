import React, {useState} from 'react'


export default function CreateEventForm() {

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {

  }

  return (
    <form method='POST' onSubmit={handleSubmit}>
      <div>
        <label>Event Name</label>
        <input
          type='text'
          onChange={(e)=>setName(e.target.value)}
          value={name}
          placeholder='Name'
          required
          />
      </div>
      <div>
        <label>Start</label>
        <input
          type='Date'
          onChange={(e)=>setStartDate(e.target.value)}
          value={startDate}
          required
          />
        <input
          type='Time'
          onChange={(e)=>setStartTime(e.target.value)}
          value={startTime}
          required
          />
      </div>
      <div>
      <label>End</label>
        <input
            type='Date'
            onChange={(e)=>setEndDate(e.target.value)}
            value={endDate}
            required
            />
          <input
            type='Time'
            onChange={(e)=>setEndTime(e.target.value)}
            value={endTime}
            required
            />
      </div>
      <div>
        <label>Address</label>
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
        <label>State</label>
        <input
          type='text'
          onChange={(e)=>setState(e.target.value)}
          value={state}
          required
          />
      </div>
      <div>
        <label>Country</label>
        <input
          type='text'
          onChange={(e)=>setCountry(e.target.value)}
          value={country}
          required
          />
      </div>


      <button type='submit'>Confirm</button>
    </form>
  )
}
