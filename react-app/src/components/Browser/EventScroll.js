import React from 'react'
import EventLine from './EventLine'

export default function EventScroll({events}) {

  return (
    <>
      {
        Object.values(events)
          .map(event => (
            <EventLine key={event.id} event={event}/>
          ))
        }
    </>
  )
}
