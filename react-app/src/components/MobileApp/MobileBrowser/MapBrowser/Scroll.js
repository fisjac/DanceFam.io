import React from 'react'
import { groupEventsByDate, sortDates } from '../../../utils/DateFuncs';


import EventLine from './EventLine';
import VenueLine from './VenueLine';

export default function Scroll({data, scrollType}) {

  switch (scrollType) {
    // Case for events
    case 'events':
      if (data) {
        const groupedEvents = groupEventsByDate(data);
        const sortedDates = sortDates(groupedEvents);
          return (
            <div className='mobile-eventscroll'>
              {
                sortedDates.map(date => {
                  let dateString = date.toLocaleDateString(undefined, {weekday: 'long',month: 'long', day: 'numeric'});
                  return dateString;
                }).map((date, idx) => (
                      <>
                        {Math.random() <= 0.1 &&
                          <ins className="adsbygoogle"
                            style={{"display":"block"}}
                            data-ad-format="fluid"
                            data-ad-layout-key="-ft+5s-18-2e+93"
                            data-ad-client="ca-pub-6254698020872115"
                            data-ad-slot="9226096593"></ins>
                        }
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
              {!Object.keys(data).length && <div className='no-events'>No upcoming events in this area</div>}
            </div>
          );
      } else {
        return (
          <div className='eventscroll'>
            {<div className='no-events'>Loading...</div>}

          </div>
        )
      };

    // Case for Venues
    case 'venues':
      if (data) {
          return (
            <div className='eventscroll'>
              {Object.values(data).map(venue => (
                <VenueLine
                  key={venue.id}
                  venue={venue}
                  />
                ))
              }
              {!Object.keys(data).length && <div className='no-events'>No upcoming events in this area</div>}
            </div>
          );
      } else {
        return (
          <div className='eventscroll'>
            {<div className='no-events'>Loading...</div>}

          </div>
        )
      };
    default: return;
  }

};
