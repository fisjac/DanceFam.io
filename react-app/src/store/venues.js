import { bindActionCreators } from "redux";

const LOAD_VENUES = 'venues/LOAD_ALL';
const ADD_VENUE = 'venues/ADD_VENUE';

export function loadVenues (payload) {
  return {
    type: LOAD_VENUES,
    payload
  }
};

export function addVenue (payload) {
  return {
    type: ADD_VENUE,
    payload
  }
};


export const getVenues = () => async dispatch => {
  const response = await fetch('/api/venues');
  if (response.ok) {
    const data = await response.json();
    dispatch(loadVenues(data))
  }
  return response
}

export const createVenue = (venue) => async dispatch => {
  const response = await fetch('/api/venues', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(venue)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addVenue(data));
  };
  return response;
};


const initialState = null;

export default function venuesReducer(state=initialState, action) {
  switch (action.type) {
    case LOAD_VENUES:
      console.log(action.payload)
      return action.payload.reduce((obj, venue)=>{
        obj[venue.id]= venue
        return obj
      },{});

    case ADD_VENUE:
      return {...state, [action.payload.id]: action.payload }

    default:
      return state;
  };
}
