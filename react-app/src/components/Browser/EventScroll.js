import React, {useContext} from 'react'
import { useSelector } from 'react-redux';

import { GoogleMapsContext } from '../../context/Maps/MapsLoader';

import Map from '../../context/Maps/Map';

import EventLine from './EventLine'

export default function EventScroll() {
  const {isLoaded, location} = useContext(GoogleMapsContext)
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
    .sort();


  console.log(location)
  return (
    <>
    {isLoaded && <Map center ={location} zoom={10} events={events}/>}
    <div className='eventscroll-title'>Upcoming Events</div>
    <div className='eventscroll'>
      {
        sortedDates.map(date => {
          let dateString = date.toLocaleDateString(undefined, {weekday: 'long',month: 'long', day: 'numeric'});
          return dateString;
        }).map((date, idx) => (
              <>
                <div key={date} className='eventline-header'>
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
    </div>
    </>
  )
}
