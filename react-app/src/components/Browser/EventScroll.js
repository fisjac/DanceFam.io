import React from 'react'
import EventLine from './EventLine'

export default function EventScroll({events, showCommunity}) {

  const eventsList = Object.values(events);

  const eventDates = eventsList.reduce((accum, event) => {
    let currentDate = new Date(event.start);
    let currentDateString = currentDate.toLocaleDateString(undefined, {weekday: 'long',month: 'long', day: 'numeric'})
    if (!accum[currentDateString]) {
      accum[currentDateString] = [event]
    } else {
      accum[currentDateString].push(event)
    };
    return accum;
  },{})

  return (
    <>
    <div className='eventscroll-title'>Events</div>
    <div className='eventscroll'>
      {
        Object.keys(eventDates)
          .map(date => (
              <>
                <div className='eventline-header'>
                {date}
                </div>
                {eventDates[date]
                  .map(event => (
                  <EventLine
                    key={event.id}
                    showCommunity={showCommunity}
                    event={event}/>
                  )
                )}
              </>
            )
          )
        }
    </div>
    </>
  )
}
