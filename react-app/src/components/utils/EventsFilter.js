export const filterEventsByBounds = (events, bounds) => {
  if (!bounds) {
    return null
  } else {

    const filteredEvents = {}
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latBounds = [ne.lat(), sw.lat()]
    const lngBounds = [ne.lng(), sw.lng()]
    for (let eventId in events) {
      const event = events[eventId];
      if (event.lat >= Math.min(...latBounds) && event.lat <= Math.max(...latBounds) &&
        event.lng >= Math.min(...lngBounds) && event.lng <= Math.max(...lngBounds)
      ) {
        filteredEvents[eventId] = event
      }
    };
    return filteredEvents;
  };
};

export const filterEventsByTypes = (events, types) => {
  const activeTypes = new Set(Object.keys(types).filter(type=>types[type]))
  console.log(activeTypes)
  const filteredEvents = {}

  for (let eventId in events) {
    if (activeTypes.has(events[eventId].type)) filteredEvents[eventId] = events[eventId]
  };
  return filteredEvents;
};

export const filterEventsByStyles = (events, styles) => {

}
