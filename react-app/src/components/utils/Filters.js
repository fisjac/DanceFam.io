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

export const filterByTypes = (data, types) => {
  const activeTypes = new Set(Object.keys(types).filter(type=>types[type]));
  const filteredData = {};

  for (let id in data) {
    if (activeTypes.has(data[id].type)) filteredData[id] = data[id]
  };
  return filteredData;
};

export const filterByStyles = (data, styles) => {
  const activeStyles = new Set(Object.keys(styles).filter(style=>styles[style]));
  const filteredData = {};

  for (let id in data) {
    for (let style of data[id].styles) {
      if (activeStyles.has(style.name)) {
        filteredData[id] = data[id];
        break;
      };
    };
  };

  return filteredData;
}


export const filterEventsByVenues = (events, venues) => {
  const filteredEvents = {};

  for (let venue of venues) {
    for (let eventId in venue.events) {
      if (!filteredEvents[eventId]) {
        filteredEvents[eventId] = events[eventId];
      };
    };
  };
  return filteredEvents;
};
