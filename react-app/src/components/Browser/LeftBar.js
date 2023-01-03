import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '../../static/DanceFamBrushNoText.svg';
import title from '../../static/DanceFamTitle.svg';
import Communities from './Communities';

import defaultImage from '../../static/dancing_couple1.svg'


function NextEvent ({user, events, communities}) {
  const history = useHistory();

  const userEvents = Object.keys(user.events).map(eventId=>events[eventId]);

  const currentUserEvents = userEvents.filter(event =>{
    const currentEventDate = new Date(event.start);
    const today = new Date();
    return currentEventDate > today;
  })

  if (Object.keys(currentUserEvents).length) {
    const nextEvent = currentUserEvents.reduce((accum,event)=> {
      const currentEventDate = new Date(event.start);
      const currentMinDate = new Date(accum.start);
      return currentEventDate < currentMinDate ? event : accum
    })

    const start = new Date(nextEvent.start);
    return (
      <div
        className='event-box'
        onClick={()=>history.push(`/${nextEvent.communityId}/events/${nextEvent.id}`)}>
          <div className='event-box-header'>
            <img
              className='event-box-image'
              src={nextEvent.imageUrl===null? defaultImage :nextEvent.imageUrl}
              alt="event_image"
              onError={e =>e.currentTarget.src = defaultImage}
              />
            <div className='event-box-title'>{nextEvent.name}</div>
          </div>
          <div className='event-box-details'>
            <div className='event-box-date'>{start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
            <div
              className='event-box-community-name'
              onClick={(e)=>{
                e.stopPropagation();
                history.push(`/${nextEvent.communityId}`)
                }}
              >{communities[nextEvent.communityId].name}</div>
            <div className='event-box-address-line'>
              <div className='location-icon'>
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className='address-section'>
                <div className='event-box-address'>{nextEvent.address}</div>
                  <div className='city-state'>
                    <div className='event-box-city'>{`${nextEvent.city}, ${nextEvent.state}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  } else {
    return (
      <div className='event-box-none'>You have no upcoming events</div>
    )
  }
}


export default function LeftBar() {
  const history = useHistory();
  const user = useSelector(state=>state.session.user);
  const communities = useSelector(state=>state.communities);
  const events = useSelector(state=>state.events);


  return (
    <div className='left-bar'>
      <div className='left-bar-logo-container' onClick={()=>history.push('/')}>
        <img className='left-bar-logo' src={logo} alt='logo'/>
        <img className='left-bar-logo-title' src={title} alt='title'/>
      </div>

      <div className='planner scroll'>
        <div className='planner-title'>Your Next Event</div>
        <NextEvent user={user} events={events} communities={communities}/>
        <div className='planner-title'>Your Communities</div>
        <Communities communities={communities}/>
      </div>
    </div>
  );
};
