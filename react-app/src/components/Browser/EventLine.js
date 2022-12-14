import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import * as eventActions from '../../store/events';
import ModalWrapper from '../../context/Modal'
import EditEventForm from './forms/EditEventForm';

import defaultImage from '../../static/dancing_couple1.svg'

export default function EventLine({event, showCommunity}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const start = new Date(event.start);
  const userId = useSelector(state=>state.session.user.id);
  const communities = useSelector(state=>state.communities);
  const communityId = event.communityId;

  return communities && (
    <>
    <div
      className='eventline-container'
      onClick={(e)=>{
        if(e.target.className.includes('eventline')) {
          history.push(`/${event.communityId}/events/${event.id}`)
        }

      }}
      >
      <div className='eventline-body'>
        <div className='eventline-body-left'>
          <img
            className='eventline-img'
            src={event.imageUrl===null?defaultImage:event.imageUrl}
            alt="community_img"
            onError={e =>e.currentTarget.src = defaultImage}
            />
          <div className='eventline-details'>
            <div className='eventline-date'>{start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
            <div className='eventline-name'>{event.name}</div>
            {showCommunity && (
              <div
                className='eventline-community'
                onClick={(e)=>{
                  e.stopPropagation();
                  history.push(`/${event.communityId}`)
                  }
                }
                >Hosted by: {communities[event.communityId].name}</div>
                )}
            <div className='eventline-attendees'>
              {event.attendeeCount} attendees
            </div>
          </div>
        </div>
        {userId === event.organiserId && (<div className='eventline-body-right'>
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
                    event.id,
                    !showCommunity? communityId: null));
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
