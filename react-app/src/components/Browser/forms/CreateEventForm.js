import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as eventActions from '../../../store/events';
import * as dateFuncs from '../../utils/DateFuncs';
import * as autocompleteFuncs from '../../utils/autocomplete';

export default function CreateEventForm({setShowModal}) {
  const dispatch = useDispatch();
  const styleCategories = useSelector(state=>state.styles);
  const typeCategories = useSelector(state=>state.types);
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
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [types, setTypes] = useState(
    Object.keys(typeCategories).reduce((accum, key)=> {
      accum[key] = false;
      return accum;
    },{})
  );
  const [styles, setStyles] = useState(
    Object.keys(styleCategories).reduce((accum, key)=> {
      accum[key] = false;
      return accum;
    },{})
  );
  const [externalUrl, setExternalUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(startDate + 'T' + startTime + ':00.000Z');
    const end = new Date(endDate + 'T' + endTime + ':00.000Z');
    const response = await dispatch(
      eventActions.createEvent({
        event: {
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
          styles,
          types
        }
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
        <div className='modal-fieldset'>
          <label>Event Type * <span style={{'font-style':'italic'}}>(Select one)</span></label>
          {Object.keys(types).map((type)=>(
            <div className='checkbox-line'>
              <div
              className={`checkbox-input ${types[type]?'checked': 'unchecked'}`}
              onClick={()=>{

              }}
              >
                {<i className="fa-solid fa-check"></i>}
              </div>
              <div className='checkbox-label'>{type}</div>
            </div>
          ))}
        </div>
        <div className='modal-fieldset'>
          <label>Dance Styles * <span style={{'font-style':'italic'}}>(Select at least one)</span></label>
          {Object.keys(styles).map((style)=>(
            <div className='checkbox-line'>
              <div
               className={`checkbox-input ${styles[style]?'checked': 'unchecked'}`}
               onClick={()=>{
                setStyles({...styles, [style]: !styles[style]})
               }}
               >
                {<i className="fa-solid fa-check"></i>}
              </div>
              <div className='checkbox-label'>{style}</div>
            </div>
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
            ref={inputRef}
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
            placeholder='City'
            required
          />
        </div>
        <div>
          <label>State</label>
          <input
            type='text'
            onChange={(e)=>setState(e.target.value)}
            value={state}
            placeholder='State'
            required
          />
        </div>
        <div>
          <label>Country *</label>
          <input
            type='text'
            onChange={(e)=>setCountry(e.target.value)}
            value={country}
            placeholder='Country'
            required
          />
        </div>

        <div>
          <label>Event Page</label>
          <input
            type='text'
            onChange={(e)=>setExternalUrl(e.target.value)}
            value={externalUrl}
            placeholder= 'Event Page Url'
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

        <button
          type='submit'
          // className='disabled'
          // disabled={true}
          >Confirm</button>
      </form>
  )
}
