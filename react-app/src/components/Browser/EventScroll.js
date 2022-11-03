import React from 'react'
import EventLine from './EventLine'

export default function EventScroll({events, showCommunity}) {

  return (
    <div className='event-scroll'>
      <div className='event-section-title'>Events</div>
      {
        Object.values(events)
          .map(event => (
            <EventLine key={event.id} showCommunity={showCommunity} event={event}/>
          ))
        }
    </div>
  )
}
