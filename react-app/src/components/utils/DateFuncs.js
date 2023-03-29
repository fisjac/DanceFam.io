export const localToUTC = (date) => {

  const offset = date.getTimezoneOffset();
  const utcTime = new Date(date + offset*1000*60);
  return utcTime;
};

export const utcToLocal = (utc) => {
  const offset = utc.getTimezoneOffset();
  const local = new Date(utc - offset*1000*60);
  return local;
};

export const dateFromBackend = (dateString) => {
  const date = new Date(dateString);
  const local = utcToLocal(date);
  return local;
};

export const dateToBackendFormat = (date) => {
  const dateString = date.toISOString();
  const backendFormatString = dateString.replace('T', ' ').substring(0,dateString.length - 5);
  return backendFormatString
}

export const checkTimeFormat = (timeString) => {
  if (timeString.length === 8) {
    return timeString;
  } else {
    return timeString + ':00'
  };
};

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
    let currentDate = dateFromBackend(event.start);
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
        const date = dateFromBackend(dateString)
        return date
      })
  dates.sort((a,b) => {
        return a - b
      });

  return dates;
};

export const splitDatetime = (datetime) => {
  const localCoerced = utcToLocal(datetime)
  const dateString = localCoerced.toISOString();
  let [date, time] = dateString.split('T');
  time = time.substring(0,8)
  return [date, time];
};

export const getLocalTime = (date) => {
  const localString = date.toLocaleTimeString('en-US');
  const noSeconds = localString.substring(0,localString.length - 6) + localString.substring(localString.length-3,localString.length);
  return noSeconds
};

export const dateCompare = (date1, date2, operator) => {
  if (operator === 'max') {
    return date1 >= date2 ? date1 : date2
  } else if (operator === 'min') {
    return date1 <= date2 ? date1 : date2
  };
};
