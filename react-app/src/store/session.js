// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_EVENT = 'session/ADD_EVENT';
const REMOVE_EVENT = 'session/REMOVE_EVENT';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER,
})

export const addEvent = (eventId) => ({
  type: ADD_EVENT,
  payload: eventId
});

export const removeEvent = (eventId) => ({
  type: REMOVE_EVENT,
  payload: eventId
});


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    };
  } else {
    return ['An error occurred. Please try again.']
  };
};

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (firstName, lastName, username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'first_name': firstName,
      'last_name': lastName,
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case ADD_EVENT:
      return {user : {...state.user, events: {...state.user.events,  [action.payload]: action.payload}}};
    case REMOVE_EVENT:
      let newEvents = {...state.user.events};
      delete newEvents[action.payload]
      return {user : {...state.user, events: newEvents}}
    default:
      return state;
  }
}
