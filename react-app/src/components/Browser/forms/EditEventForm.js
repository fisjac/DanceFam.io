import React, { useState, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as eventActions from '../../../store/events';
import * as dateFuncs from '../../utils/DateFuncs';
import SelectionProvider, { SelectorsContext } from '../../../context/Maps/Selector';

import  ModalMapBrowser from './ModalMapBrowser';

export default function SelectionLinkedForm({event, setShowModal}) {
  return (
    <SelectionProvider persistSelections={true}>
      <EditEventForm event={event} setShowModal={setShowModal}/>
    </SelectionProvider>
  )
};

export function EditEventForm({event, setShowModal}) {
  const dispatch = useDispatch();

  const styleCategories = useSelector(state=>state.styles);
  const types = useSelector(state=>state.types);
  const typesList = Object.keys(types);

  let [startDateString, startTimeString] = dateFuncs.splitDatetime(event.start);
  let [endDateString, endTimeString] = dateFuncs.splitDatetime(event.end);

  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(0);

  const [name, setName] = useState(event.name);
  const [startDate, setStartDate] = useState(startDateString);
  const [startTime, setStartTime] = useState(startTimeString);
  const [endDate, setEndDate] = useState(endDateString);
  const [endTime, setEndTime] = useState(endTimeString);
  const [externalUrl, setExternalUrl] = useState(event.externalUrl);
  const [imageUrl, setImageUrl] = useState(event.imageUrl);
  const [type, setType] = useState(event.type);
  const { selectedId } = useContext(SelectorsContext);

  const eventStyles = new Set(event.styles);
  const [styles, setStyles] = useState(
    Object.keys(styleCategories).reduce((accum, key)=> {
      accum[key] = eventStyles.has(key)?true:false;
      return accum;
    },{})
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartTime = dateFuncs.checkTimeFormat(startTime);
    const formattedEndTime = dateFuncs.checkTimeFormat(endTime);
    const start = new Date(startDate + 'T' + formattedStartTime + '.000Z');
    const end = new Date(endDate + 'T' + formattedEndTime + '.000Z');
    const response = await dispatch(
      eventActions.updateEvent({
        id: event.id,
        name,
        start: dateFuncs.dateToBackendFormat(start),
        end: dateFuncs.dateToBackendFormat(end),
        external_url: externalUrl?externalUrl:null,
        image_url: imageUrl?imageUrl:null,
        styles,
        type,
        venue_id: selectedId
      })
    );
    if (response.ok) {
      setShowModal(false)
      setErrors([]);
    } else {
      const data = await response.json()
      setErrors(data.errors)
    };
  };

  return (
    <>
      <div style={{'display': `${page === 0?'':'none'}`}}>
        <ModalMapBrowser
          browserType='venues'
          filter={false}
          />
        <div
          className={`page-button ${selectedId?'':'disabled'}`}
          onClick={()=>{
            if (selectedId) {
              setPage(page + 1);
            };
          }}
          >
            Next
        </div>
      </div>

      {/* ------- Second Page ------- */}

      <div
        style={{'display': `${page === 1? '':'none'}`}}
        >
        <form method='POST' onSubmit={handleSubmit}>
          <div className='errors'>
            {errors.map((error, idx) => (
              <div className='error' key={idx}>{error}</div>
            ))}
          </div>
          <div className='modal-fieldset'>
            <label>Event Type * <span style={{'font-style':'italic'}}>(Select one)</span></label>
            {typesList.map((typeName)=>(
              <div className='checkbox-line'>
                <div
                className={`checkbox-input ${typeName===type?'checked': 'unchecked'}`}
                onClick={()=>{
                  setType(typeName)
                }}
                >
                  {<i className="fa-solid fa-check"></i>}
                </div>
                <div className='checkbox-label'>{typeName}</div>
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
                min={dateFuncs.dateCompare(startDate,dateFuncs.dateToday(), 'max')}
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
            <label>Event Page</label>
            <input
              type='text'
              onChange={(e)=>setExternalUrl(e.target.value)}
              value={externalUrl}
              placeholder='Event Page Url'
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
            className='submit-button'
            type='submit'
            // className='disabled'
            // disabled={true}
            onClick={handleSubmit}
            >
            Confirm
          </button>
        </form>

        <div
          className={`page-button`}
          onClick={()=>{
            setPage(page - 1)
          }}
          >
            Previous
        </div>
      </div >
    </>
    )
}
