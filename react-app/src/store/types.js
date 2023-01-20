const LOAD_TYPES = 'types/load';

const loadTypes = (payload) => {
  return {
    type: LOAD_TYPES,
    payload
  }
}

export const getTypes = () => async dispatch => {
  const res = await fetch('/api/types');
    if (res.ok) {
      const data = await res.json();
      const typeToggles = Object.values(data).reduce((accum,obj)=> {
        accum[obj.name] = true;
        return accum
      },{})
      dispatch(loadTypes(typeToggles))
    };
};

const initialState = null
export default function typesReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_TYPES:
      return {...action.payload}
    default:
      return state
  };
};
