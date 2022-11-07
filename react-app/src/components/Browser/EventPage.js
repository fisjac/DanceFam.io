import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ModalWrapper from '../../context/Modal';
import * as eventActions from '../../store/events';
import EditEventForm from './forms/EditEventForm';
import defaultImage from '../../static/dancing_couple1.svg'

import './EventPage.css'

export default function EventPage() {
  const communities = useSelector(state=>state.communities);
  const events = useSelector(state=>state.events);
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
                  history.push(`/${event.communityId}`)
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
      <img
            className='eventpage-image'
            src={event.imageUrl===null?defaultImage:event.imageUrl}
            alt="event_img"
            onError={e =>e.currentTarget.src = defaultImage}
            />

      <div className='flex between'>
        <div className='column-flex'>
          <div
            className='eventline-date'
            >
            Start: {start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}
          </div>
          <div
            className='eventline-date'
            >
            End: {end.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {end.toLocaleTimeString(undefined, {timeStyle: 'short'})}
          </div>
        </div>


        <div className='flex'>
          <div className='location-dot'><i className="fa-solid fa-location-dot"></i></div>
          <div className='address-section'>
            <div>{event.address}</div>
            <div className='city-state'>
              <div>{`${event.city}, ${event.state}, ${event.country}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div>Attendees: {event.attendeeCount}</div>
      <div>Description: {event.description?event.description:'This event has no details'}</div>
    </>
  )
}
