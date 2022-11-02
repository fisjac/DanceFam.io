import React from 'react'
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'


function EventLine({event, allCommunities}) {
  const start = new Date(event.start)
  const history = useHistory()

  return (
    <div
      className='eventline-container'
      onClick={()=>{
        history.push(`/${event.community.replace(' ','-')}/events/${event.id}`)
      }}
      >
      <div className='eventline-header'>
        {start.toLocaleDateString(undefined, {weekday: 'long',month: 'long', day: 'numeric'})}
      </div>
      <div className='eventline-body'>
        <div className='eventline-img'></div>
        <div className='eventline-details'>
          <div className='eventline-date'>{start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
          <div className='eventline-name'>{event.name}</div>
          <div
            className='eventline-community'
            onClick={(e)=>{
              e.stopPropagation();
              history.push(`/${event.community
                .replace(' ','-')}`)
              }
            }
            >{event.community}</div>
          <div className='eventline-attendees'>
            {event.attendeeCount} attendees
          </div>
        </div>

      </div>
    </div>
  )
}

export default function EventScroll() {
  const allEvents = useSelector(state=> state.events.allEvents)
  const allCommunities = useSelector(state=> state.communities.allCommunities)

  return allEvents && allCommunities && (

    <div
      className='event-scroll'
      >
      {
        Object.values(allEvents)
          .map(event => (
            <EventLine key={event.id} event={event} allCommunities={allCommunities}/>
          ))
        }
    </div>
  )
}
