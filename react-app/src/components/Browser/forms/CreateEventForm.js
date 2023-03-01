import React, {useState, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as eventActions from '../../../store/events';
import * as dateFuncs from '../../utils/DateFuncs';
import SelectionProvider, { SelectorsContext } from '../../../context/Maps/Selector';

import  ModalMapBrowser from './ModalMapBrowser';


export default function SelectionLinkedForm({setShowModal}) {
  return (
    <SelectionProvider persistSelections={true}>
      <CreateEventForm setShowModal={setShowModal}/>
    </SelectionProvider>
  )
}

export function CreateEventForm({setShowModal}) {
  const dispatch = useDispatch();
  const { selectedId} = useContext(SelectorsContext);

  const styleCategories = useSelector(state=>state.styles);
  const types = useSelector(state=>state.types);

  const typesList = Object.keys(types);

  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState([]);


  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState('');
  const [styles, setStyles] = useState(
    Object.keys(styleCategories).reduce((accum, key)=> {
      accum[key] = false;
      return accum;
    },{})
  );
  const [externalUrl, setExternalUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');


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
          external_url: externalUrl?externalUrl:null,
          image_url: imageUrl?imageUrl:null,
          styles,
          type,
          venue_id: selectedId
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

  switch (page) {
    case 0:
      return (
        <>
        <ModalMapBrowser
          browserType='venues'
          filter={false}
          />
        <div
          className={`page-button ${selectedId?'':'disabled'}`}
          onClick={()=>{
            if (!selectedId) {
              return
            } else {
              setPage(page + 1);
            };
          }}
          >
            Next
        </div>
        </>
      )

    case 1:
      return (
        <>

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
        <div
          className={`page-button`}
          onClick={()=>{
            setPage(page - 1)
          }}
          >
            Previous
        </div>
        </>
      )
  }
};
