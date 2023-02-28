import React from 'react'
import { groupEventsByDate, sortDates } from '../../utils/DateFuncs';


import EventLine from './EventLine'

export default function EventScroll({events}) {


  if (events) {

   const groupedEvents = groupEventsByDate(events);
   const sortedDates = sortDates(groupedEvents);

      return (
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
                    {groupedEvents[date]
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
      );
  } else {
    return (
      <div className='eventscroll'>
        {<div className='no-events'>Loading...</div>}

      </div>
    )
  };
};
