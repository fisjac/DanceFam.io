import { batch } from 'react-redux';
import * as sessionActions from './session';
import * as venueActions from './venues';

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
  console.log('removing event')
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
  };
  return response;
};

export const getEvent = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = await response.json();
    dispatch(loadEvent(event));
  };
  return response;
};

export const createEvent = (event) => async dispatch => {
  const response = await fetch(`/api/events`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  });
  if (response.ok) {
    const event = await response.json();
    const venueResponse = await fetch('/api/venues');
    if (venueResponse.ok) {
      const newVenues = await venueResponse.json()
      batch(()=> {
        dispatch(loadEvent(event))
        dispatch(sessionActions.addEvent(event.id))
        dispatch(venueActions.loadVenues(newVenues))
      })
    } else return venueResponse;
  };
  return response;
}

export const updateEvent = (event) => async dispatch => {
  const response = await fetch(`/api/events/${event.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  });
  if (response.ok) {
    const event = await response.json();
    const venueResponse = await fetch('/api/venues');
    if (venueResponse.ok) {
      const newVenues = await venueResponse.json();
      batch(() =>{
        dispatch(editEvent(event));
        dispatch(venueActions.loadVenues(newVenues))
      });
    } else return venueResponse;
  };
  return response;
};

export const deleteEvent = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`,{
    method: 'DELETE'
  });
  if (response.ok) {
    const venueResponse = await fetch('/api/venues');
    if (venueResponse.ok) {
      const newVenues = await venueResponse.json();
      batch(() => {
        dispatch(removeEvent(eventId))
        dispatch(venueActions.loadVenues(newVenues))
      });
    } else return venueResponse;
  };
  return response;
};


const initialState = null;

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return action.payload.reduce((obj, event)=>{
        obj[event.id]= event
        return obj
      },{})
    case LOAD_EVENT:
      return {...state, [action.payload.id]: action.payload}
    case EDIT:
      return {
        ...state,
        [action.payload.id]: {...action.payload}
      };
    case DELETE:
      let newEvents = {...state};
      delete newEvents[action.payload];
      return {...newEvents};
    default:
      return state;
  }
}
