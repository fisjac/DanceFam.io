import React from 'react'
import { useSelector } from 'react-redux'

export default function EventScroll() {
  const allEvents = useSelector(state=> state.events.allEvents)

  return allEvents && (

    <div
      className='event-scroll'
      >
      {
        Object.values(allEvents)
          .map(event => (
            <div key={event.id}>{event.name}</div>
          ))
        }
    </div>
  )
}
