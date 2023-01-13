const LOAD_MAPS_KEY = 'keys/LOAD_MAPS';
const LOAD_PLACES_KEY = 'keys/LOAD_PLACES';

const loadApiKey = (key) => {
  return {
  type: LOAD_PLACES_KEY,
  payload: key
  }
};

export const getKey = () => async dispatch => {
  const res = await fetch('/api/keys/places', {
    method: 'POST'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadApiKey(data))
  }
}


const initialState = {maps: null, places: null};
const  mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLACES_KEY:
      return {...state, places: action.payload};
    default:
      return state;
  };
};

export default mapsReducer;
