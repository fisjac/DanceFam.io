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
