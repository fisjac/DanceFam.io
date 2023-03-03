export const filterVenuesByBounds = (venues, bounds) => {
  if (!Object.values(venues).length) return {}
  if (!bounds) {
    return {}
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
  if (!Object.values(data).length) return {}
  const activeTypes = new Set(Object.keys(types).filter(type=>types[type]));
  const filteredData = {};

  for (let id in data) {
    if (dataType === 'events') {
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
  if (!Object.values(data).length) return {}
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
  if (!Object.values(events).length) return {}
  const filteredEvents = {};
  for (let venueId in venues) {
    for (let eventId of venues[venueId].events) {
      if (!filteredEvents[eventId]) {
        filteredEvents[eventId] = events[eventId];
      };
    };
  };
  return filteredEvents;
};
