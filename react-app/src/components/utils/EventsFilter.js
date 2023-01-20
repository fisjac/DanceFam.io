export const filterEventsByBounds = (events, bounds) => {
  if (!bounds) {
    return null
  } else {

    const filteredEvents = {}
    const lngBounds = bounds.Ja;
    const latBounds = bounds.Wa;
    for (let eventId in events) {
      const event = events[eventId];
      if (event.lat >= latBounds.lo && event.lat <= latBounds.hi &&
          event.lng >= lngBounds.lo && event.lng <= lngBounds.hi
      ) {
        filteredEvents[eventId] = event
      }
    };
    return filteredEvents;
  };
};
