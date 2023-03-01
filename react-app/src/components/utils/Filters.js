export const filterVenuesByBounds = (venues, bounds) => {
  if (!bounds) {
    return null
  } else {

    const filteredVenues = {}
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latBounds = [ne.lat(), sw.lat()]
    const lngBounds = [ne.lng(), sw.lng()]
    for (let venueId in venues) {
      const venue = venues[venueId];
      if (venue.lat >= Math.min(...latBounds) && venue.lat <= Math.max(...latBounds) &&
        venue.lng >= Math.min(...lngBounds) && venue.lng <= Math.max(...lngBounds)
      ) {
        filteredVenues[venueId] = venue
      }
    };
    return filteredVenues;
  };
};

export const filterByTypes = (data, types, dataType='venues') => {
  const activeTypes = new Set(Object.keys(types).filter(type=>types[type]));
  const filteredData = {};

  for (let id in data) {
    if (dataType === 'events') {
      // console.log(data)
      if (activeTypes.has(data[id].type)) filteredData[id] = data[id]
    } else {
      for (let type of data[id].types) {
        if (activeTypes.has(type)) {
          filteredData[id] = data[id]
          break
        }
      }
    }
  };
  return filteredData;
};

export const filterByStyles = (data, styles) => {
  const activeStyles = new Set(Object.keys(styles).filter(style=>styles[style]));
  const filteredData = {};

  for (let id in data) {
    for (let style of data[id].styles) {
      if (activeStyles.has(style)) {
        filteredData[id] = data[id];
        break;
      };
    };
  };

  return filteredData;
}


export const filterEventsByVenues = (events, venues) => {
  const filteredEvents = {};
  for (let venueId in venues) {
    for (let eventId of venues[venueId].events) {
      console.log(eventId)
      if (!filteredEvents[eventId]) {
        filteredEvents[eventId] = events[eventId];
      };
    };
  };
  return filteredEvents;
};
