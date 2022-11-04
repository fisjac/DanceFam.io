import React from 'react'
import EventLine from './EventLine'

export default function EventScroll({events, showCommunity}) {

  return (
    <div className='scroll'>
      <div className='scroll-section-title'>Events</div>
      {
        Object.values(events)
          .map(event =>{
            return <EventLine key={event.id} showCommunity={showCommunity} event={event}/>
          }
          )
        }
    </div>
  )
}
