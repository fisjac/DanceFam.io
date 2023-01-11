import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';


import * as eventActions from '../../../store/events';
import { getKey } from '../../../store/keys';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script"); // create script tag
  script.type = "text/javascript";

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // load by url
  document.getElementsByTagName("head")[0].appendChild(script); // append to head
};

// handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
function handleScriptLoad(updateQuery, autoCompleteRef) {
  // assign autoComplete with Google maps place one time
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {}
  );
  autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

export default function CreateEventForm({setShowModal}) {
  const dispatch = useDispatch();

  const autoCompleteRef = useRef(null);


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
  const [imageUrl, setImageUrl] = useState(null);
  const key = useSelector(state => state.keys.places);

  console.log('places key', key)
  // Google Maps autocomplete API script
  useEffect(async () => {
      await dispatch(getKey('places'))
      console.log('places key in useEffect', key)
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`,
        () => handleScriptLoad(setAddress, autoCompleteRef)
      );
    }, [dispatch, key]);



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
        event: {
          name,
          start: dateToBackendFormat(start),
          end: dateToBackendFormat(end),
          address,
          city,
          state,
          country,
          description,
          image_url: imageUrl?imageUrl:null,}
        }));
    if (response.ok) {
      setShowModal(false);
      setErrors([]);
    } else {
      const data = await response.json()
      setErrors(data.errors)
    };
  };

  return key && (

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
          onChange={(e)=>setEndTime(e.target.value)}
          value={endTime}
          required
        />
      </div>
      <div>
        <label>Address *</label>
        <input
          ref={autoCompleteRef}
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
