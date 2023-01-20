export const dateToBackendFormat = (date) => {
  let dateString = date.toISOString();
  console.log(date, dateString)
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
  const dates = Object.values(groupedEvents)
      .map(event => {
        const dateString = event[0].start
        const date = new Date(dateString)
        return date
      })
  dates.sort((a,b) => {
        return a - b
      });

  return dates;
};

export const splitDatetime = (dateString) => {
  const dateTime = new Date(dateString);
  let [date, time] = dateTime.toISOString().split('T');
  time = time.substring(0,8)
  return [date, time];
};

export const getUtcTime = (date) => {
  const utcString = date.toUTCString();
  const timeStringMilitary = utcString.substring(17,22);
  const hour = Number(timeStringMilitary.substring(0,2))
  const nonMilitaryHour = hour % 12 === 0 ? 12 : hour % 12;
  const nonMilitaryMinutes = timeStringMilitary.substring(3,5)
  const amPm = Math.floor(hour/12)?'PM':'AM';
  const nonMilitaryString = `${String(nonMilitaryHour)}:${nonMilitaryMinutes} ${amPm}`
  return nonMilitaryString
}
