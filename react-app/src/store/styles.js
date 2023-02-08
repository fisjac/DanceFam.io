const LOAD_STYLES = 'styles/load';
const TOGGLE_STYLE = 'style/toggle'

const loadStyles = (payload) => {
  return {
    type: LOAD_STYLES,
    payload
  };
};

export const toggleStyle = (styleName) => {
  return {
    type: TOGGLE_STYLE,
    payload: styleName
  };
};

export const getStyles = () => async dispatch => {
  let styleToggles;
  const styles = JSON.parse(localStorage.getItem('styles'));
  if (styles) {
    styleToggles = styles
  } else {
    const res = await fetch('/api/styles');
      if (res.ok) {
        const data = await res.json();
        const styleToggles = Object.values(data).reduce((accum,obj)=> {
          accum[obj.name] = true;
          return accum
        },{})
      };
  }
    dispatch(loadStyles(styleToggles))
};

const initialState = null
export default function stylesReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_STYLES:
      return {...action.payload}
    case TOGGLE_STYLE:
      return {...state, [action.payload]: !state[action.payload]}
    default:
      return state
  };
};
