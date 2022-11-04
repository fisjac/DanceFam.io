import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


export default function EventPage({communities, events}) {
  const params = useParams();
  const event = events[params.eventId]

  const start = new Date(event.start);
  const end = new Date(event.end);
  return (
    <>
      <div>{event.name}</div>
      <div className='eventline-date'>Start: {start.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {start.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>
      <div className='eventline-date'>End: {end.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric',})} ⋅ {end.toLocaleTimeString(undefined, {timeStyle: 'short'})}</div>

      <div>{event.address}</div>
      <div>
        <div>{event.city}</div>, <div>{event.state}</div>
      </div>
      <div>{event.country}</div>
      <div>Attendees: {event.attendeeCount}</div>
      <div>{event.description}</div>
    </>
  )
}
