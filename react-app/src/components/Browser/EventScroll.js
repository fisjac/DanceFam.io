import React from 'react'
import EventLine from './EventLine'

export default function EventScroll({events, showCommunity}) {
  console.log('in Main/EventScroll Component')
  return (
    <>
    <div className='eventscroll-title'>Events</div>
    <div className='eventscroll'>
      {
        Object.values(events)
          .map(event =>{
            return <EventLine key={event.id} showCommunity={showCommunity} event={event}/>
          }
          )
        }
    </div>
    </>
  )
}
