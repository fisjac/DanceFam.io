import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ModalWrapper from '../../context/Modal';
import * as eventActions from '../../store/events';
import EditEventForm from './forms/EditEventForm';
import './EventPage.css'

export default function EventPage({communities, events}) {
  const params = useParams();
  const event = events[params.eventId]
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state=>state.session.user.id)

  if (!event) {history.push(`/${params.community}`)}
  const start = new Date(event.start);
  const end = new Date(event.end);
  return (
    <>
      <div className='eventpage-header'>
        <div className='eventpage-title'>{event.name}</div>
        {userId === event.organiserId && <div className='eventpage-rhs-icons'>
          <ModalWrapper
            header='Edit this event'
            form={<EditEventForm event={event}/>}
            >
            <div className='icon-button'><i className="fa-solid fa-pen"></i></div>
          </ModalWrapper>
          <div
            className='icon-button'
            onClick={
              async (e)=>{
                e.stopPropagation()
                if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
                  history.push(`/${event.community.replaceAll(' ','-')}`)
                  const response = await dispatch(
                    eventActions.deleteEvent(event.id, communities[event.community])
                    );
                  if (response.ok) {
                    alert(`${event.name} successfully deleted.`)
                  };
                }
              }
            }
            >
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>}
      </div>
      <div className = 'eventpage-image' style={{backgroundImage: `url(${event.imageUrl})`}}></div>
      <div className='eventline-date'>Start: {start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
      <div className='eventline-date'>End: {end.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {end.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>

      <div>{event.address}</div>
      <div>
        <div>{event.city}</div>, <div>{event.state}</div>
      </div>
      <div>{event.country}</div>
      <div>Attendees: {event.attendeeCount}</div>
      <div>{event.description}</div>
    </>
  )
}
