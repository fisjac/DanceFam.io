const LOAD_MAPS_KEY = 'keys/LOAD_MAPS';
const LOAD_PLACES_KEY = 'keys/LOAD_PLACES';

const loadApiKey = (key, keyType) => {
  let type;
  switch (keyType) {
    case 'maps':
      type = LOAD_MAPS_KEY;
      break;
    case 'places':
      type = LOAD_PLACES_KEY;
      break
  }
  return {
  type: type,
  payload: key
  }
};

export const getKey = (keyType) => async dispatch => {
  const res = await fetch(`/api/keys/${keyType}`, {
    method: 'POST'
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadApiKey(data, keyType))
  }
}


const initialState = {maps: null, places: null};
const  mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MAPS_KEY:
      return {...state, maps: action.payload};
    case LOAD_PLACES_KEY:
      return {...state, places: action.payload};
    default:
      return state;
  };
};

export default mapsReducer;
