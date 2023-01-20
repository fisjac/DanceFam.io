const LOAD_STYLES = 'styles/load';

const loadStyles = (payload) => {
  return {
    type: LOAD_STYLES,
    payload
  };
};

export const getStyles = () => async dispatch => {
  const res = await fetch('/api/styles');
    if (res.ok) {
      const data = await res.json();
      const styleToggles = Object.values(data).reduce((accum,obj)=> {
        accum[obj.name] = true;
        return accum
      },{})
      dispatch(loadStyles(styleToggles))
    };
};

const initialState = null
export default function stylesReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_STYLES:
      return {...action.payload}
    default:
      return state
  };
};
