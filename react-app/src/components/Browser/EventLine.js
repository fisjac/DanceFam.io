import React from 'react'
import {useHistory} from 'react-router-dom'

export default function EventLine({event}) {
  const history = useHistory()
  const start = new Date(event.start)
  console.log(event)
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
