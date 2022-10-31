const LOAD_EVENTS = 'events/LOAD_ALL';
const LOAD_EVENT = 'events/LOAD_ONE';
const EDIT = 'events/EDIT';
const DELETE = 'events/DELETE';


// Actions
export function load_events (payload) {
  return {
    type: LOAD_EVENTS,
    payload
  }
};

export function load_event (payload) {
  return {
    type: LOAD_EVENT,
    payload
  }
};

export function edit_event (payload) {
  return {
    type: EDIT,
    payload
  }
};

export function delete_event (payload) {
  return {
    type: DELETE,
    payload
  }
};

// Thunks

export const get_events = () => async dispatch => {
  const response = await fetch('/api/events');
  if (response.ok) {
    const events = await response.json();
    dispatch(load_events(events));
    return response;
  };
  return response;
};

export const get_event = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = await response.json();
    dispatch(load_event(event));
    return response;
  };
  return response;
};

export const edit_event = (event) => async dispatch => {
  const response = await fetch(`/api/events/${event.id}`,{
    method: 'PUT',
    header: {'Content-Type': 'application/json'},
    body: event
  });
  if (response.ok) {
    const event = await response.json();
    dispatch(edit_event(event));
    dispatch(load_events())
    return response;
  };
  return response;
};

export const delete_event = (eventId) => async dispatch => {
  const response = await fetch (`api/events/${eventId}`,{
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(delete_event(eventId))
    return response;
  };
  return response;
};


initalState = {events: null, singleEvent: null};

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
