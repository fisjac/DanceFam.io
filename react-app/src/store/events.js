const LOAD_EVENTS = 'events/LOAD_ALL';
const LOAD_EVENT = 'events/LOAD_ONE';
const EDIT = 'events/EDIT';
const DELETE = 'events/DELETE';


// Actions
export function loadEvents (payload) {
  return {
    type: LOAD_EVENTS,
    payload
  }
};

export function loadEvent (payload) {
  return {
    type: LOAD_EVENT,
    payload
  }
};

export function editEvent (payload) {
  return {
    type: EDIT,
    payload
  }
};

export function removeEvent (payload) {
  return {
    type: DELETE,
    payload
  }
};

// Thunks

export const getEvents = () => async dispatch => {
  const response = await fetch('/api/events');
  if (response.ok) {
    const events = await response.json();
    dispatch(loadEvents(events));
    return response;
  };
  return response;
};

export const getEvent = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = await response.json();
    dispatch(loadEvent(event));
    return response;
  };
  return response;
};

export const updateEvent = (event) => async dispatch => {
  const response = await fetch(`/api/events/${event.id}`,{
    method: 'PUT',
    header: {'Content-Type': 'application/json'},
    body: event
  });
  if (response.ok) {
    const event = await response.json();
    dispatch(editEvent(event));
    dispatch(loadEvents())
    return response;
  };
  return response;
};

export const deleteEvent = (eventId) => async dispatch => {
  const response = await fetch (`api/events/${eventId}`,{
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(removeEvent(eventId))
    return response;
  };
  return response;
};


const initialState = {events: null, singleEvent: null};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return {...state, events: {...action.payload}};
    case LOAD_EVENT:
      return {...state, singleEvent: {...action.payload}};
    case EDIT:
      return {...state, singleEvent: {...action.payload}};
    case DELETE:
      return {events: {...state.events, [action.payload]: null}, singleEvent: null};
    default:
      return state;
  }
}
