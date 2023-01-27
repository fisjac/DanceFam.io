import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as eventActions from '../../store/events';
import ModalWrapper from '../../context/Modal/Modal'
import EditEventForm from './forms/EditEventForm';
import { getUtcTime } from '../utils/DateFuncs';

import { GoogleMapsContext } from '../../context/Maps/MapsLoader';
import defaultImage from '../../static/dancing_couple1.svg'


export default function EventLine({event}) {
  const {selectedEvent, setSelectedEvent, setShowInfoWindow} = useContext(GoogleMapsContext)
  const dispatch = useDispatch();
  const start = new Date(event.start);
  const user = useSelector(state=>state.session.user);

  return (
    <>
      <div
        className='eventline-container'
        onClick={(e)=>{
          if(e.target.className.includes('eventline')) {
            if (event.externalUrl)window.open(event.externalUrl)
          }

        }}
        >
        <div className='eventline-body'>
          <img
            className='eventline-img'
            src={event.imageUrl===null?defaultImage:event.imageUrl}
            alt="event_img"
            onError={e =>e.currentTarget.src = defaultImage}
            />
          <div className='eventline-details'>
            <div className='eventline-name'>{event.name}</div>
            <div className='eventline-date'>{getUtcTime(start)}</div>
          </div>
          {user && user.id === event.organiserId && (<div className='eventline-body-right'>
            <ModalWrapper header='Edit this Event' stopProp={true} addClickFunc={async ()=> await dispatch(eventActions.loadEvent(event.id))} form={<EditEventForm event={event}/>}>
              <div className='clickable-icon'>
                <i className="fa-solid fa-pen"></i>
              </div>
            </ModalWrapper>
              <div className='clickable-icon' onClick={async (e)=>{
                e.stopPropagation()
                if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
                  const response = await dispatch(
                    eventActions.deleteEvent(
                      event.id));
                  if (response.ok) alert(`${event.name} successfully deleted.`);
                }
                }}
                >
                <i className="fa-solid fa-trash"></i>
              </div>
          </div>)}
        </div>
      </div>
    </>
  )
}
