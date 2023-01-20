export const dateToBackendFormat = (date) => {
  let dateString = date.toISOString();
  return dateString.replace('T', ' ').substring(0,dateString.length - 5)
}

export const dateToday = (date = new Date()) => {
  return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2,0),
      String(date.getDate()).padStart(2,0),
  ].join('-');
};


export const groupEventsByDate = (events) => {
  const eventsList = Object.values(events);
  const groupedEvents = eventsList.reduce((accum, event) => {
    let currentDate = new Date(event.start);
    let currentDateString = currentDate.toLocaleDateString(undefined, {weekday: 'long',month: 'long', day: 'numeric'})
    if (!accum[currentDateString]) {
      accum[currentDateString] = [event]
    } else {
      accum[currentDateString].push(event)
    };
    return accum;
  },{});
  return groupedEvents
};

export const sortDates = (groupedEvents) => {
  const sortedDates = Object.values(groupedEvents)
      .map(events=>{
        let event = events[0]
        let start = event.start;
        let date = new Date(start);
        return date
      })
      .sort((a,b)=> {
        return a.start > b.start
      });
  return sortedDates;
};

export const splitDatetime = (dateString) => {
  const dateTime = new Date(dateString);
  let [date, time] = dateTime.toISOString().split('T');
  time = time.substring(0,8)
  return [date, time];
};
