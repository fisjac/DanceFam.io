import React from 'react'
import { useSelector } from 'react-redux';


import EventLine from './EventLine'

export default function EventScroll() {
  const events = useSelector(state=>state.events)
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
  },{});

  const sortedDates = Object.values(eventDates)
    .map(events=>{
      let event = events[0]
      let start = event.start;
      let date = new Date(start);
      return date
    })
    .sort((a,b)=> {
      return a.start > b.start
    });

  return (
    <>

    <div className='eventscroll'>
      {
        sortedDates.map(date => {
          let dateString = date.toLocaleDateString(undefined, {weekday: 'long',month: 'long', day: 'numeric'});
          return dateString;
        }).map((date, idx) => (
              <>
                <div key={date + '-' + idx} className='eventline-header'>
                  {date}
                </div>
                {eventDates[date]
                  .map(event => (
                  <EventLine
                    key={event.name + event.id}
                    event={event}/>
                  )
                )}
              </>
            )
          )
      }
      {!Object.keys(events).length && <div className='no-events'>No upcoming events in this area</div>}
    </div>
    </>
  )
}
