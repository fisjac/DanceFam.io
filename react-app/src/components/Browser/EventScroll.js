import React from 'react'
import EventLine from './EventLine'

export default function EventScroll({events, showCommunity}) {

  return (
    <>
      {
        Object.values(events)
          .map(event => (
            <EventLine key={event.id} showCommunity={showCommunity} event={event}/>
          ))
        }
    </>
  )
}
