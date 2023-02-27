const LOAD_TYPES = 'types/load';
const TOGGLE_TYPES = 'types/toggle';

const loadTypes = (payload) => {
  return {
    type: LOAD_TYPES,
    payload
  }
}

export const toggleType = (typeName) => {
  return {
    type: TOGGLE_TYPES,
    payload: typeName
  };
};

export const getTypes = () => async dispatch => {
  let typeToggles;
  const types = JSON.parse(localStorage.getItem('types'))
  if (types) {
    typeToggles = types
  } else {
    const res = await fetch('/api/types');
    if (res.ok) {
      const data = await res.json();
      typeToggles = Object.values(data).reduce((accum,obj)=> {
        accum[obj.name] = true;
        return accum
      },{})
    };
  };
  dispatch(loadTypes(typeToggles))
};

const initialState = null
export default function typesReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_TYPES:
      return {...action.payload}
    case TOGGLE_TYPES:
      return {...state, [action.payload]: !state[action.payload]}
    default:
      return state
  };
};
