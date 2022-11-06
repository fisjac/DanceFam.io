import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '../../static/DanceFamBrushNoText.svg';
import title from '../../static/DanceFamTitle.svg';
import Communities from './Communities';


function NextEvent ({user, events}) {
  const history = useHistory();

  const userEvents = Object.keys(user.events).map(eventId=>events[eventId]);

  if (Object.keys(userEvents).length) {
    const nextEvent = userEvents.reduce((accum,event)=> {
      const currentEventDate = new Date(event.start);
      const currentMinDate = new Date (accum.start);
      return currentEventDate < currentMinDate ? event : accum
    })

    const start = new Date(nextEvent.start);
    const end = new Date(nextEvent.end);

    return (
      <div
        className='event-box'
        onClick={()=>history.push(`/${nextEvent.community.replaceAll(' ','-')}/events/${nextEvent.id}`)}>
          <div className='event-box-header'>
            <div className='event-box-image' style={{backgroundImage: `url(${nextEvent.imageUrl})`}}></div>
            <div className='event-box-title'>{nextEvent.name}</div>
          </div>
          <div className='event-box-date'>{start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
          <div className='event-box-community-name' onClick={()=>history.push(`/${nextEvent.community.replaceAll(' ','-')}`)}>{nextEvent.community}</div>
          <div className='event-box-address-line'>
            <div className='address-section'>
            <div className='event-box-address'>{nextEvent.address}</div>
              <div className='city-state'>
                <div className='event-box-city'>{nextEvent.city}</div>,
                <div className='event-box-state'>{nextEvent.state}</div>
              </div>
            </div>
            <div className='location-icon'>
              <i className="fa-solid fa-location-dot"></i>
            </div>
          </div>
      </div>
    )
  } else {
    return (
      <div className='event-box'>you have no events</div>
    )
  }
}


export default function LeftBar({events, communities}) {
  const history = useHistory();
  const user = useSelector(state=>state.session.user);

  return (
    <div className='left-bar'>
      <div className='left-bar-logo-container' onClick={()=>history.push('/')}>
        <img className='left-bar-logo' src={logo} alt='logo'/>
        <img className='left-bar-logo-title' src={title} alt='title'/>
      </div>

      <div className='planner'>
        <div className='planner-title'>Your Next Event</div>
        <NextEvent user={user} events={events}/>
        <Communities communities={communities}/>
      </div>
    </div>
  );
};
