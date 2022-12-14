import * as eventActions from './events';
import * as sessionActions from './session';

import {batch} from 'react-redux';

const LOAD_COMMUNITIES = 'communities/LOAD_ALL';
const LOAD_COMMUNITY = 'communities/LOAD_ONE';
const EDIT = 'communities/EDIT';
const DELETE = 'communities/DELETE';


// Actions
export function loadCommunities (payload) {
  return {
    type: LOAD_COMMUNITIES,
    payload
  }
};

export function loadCommunity (payload) {
  return {
    type: LOAD_COMMUNITY,
    payload
  }
};

export function editCommunity (payload) {
  return {
    type: EDIT,
    payload
  }
};

export function removeCommunity (payload) {
  return {
    type: DELETE,
    payload
  }
};

// Thunks

export const getCommunities = () => async dispatch => {
  const response = await fetch('/api/communities');
  if (response.ok) {
    const communities = await response.json();
    dispatch(loadCommunities(communities));
    return response;
  };
  return response;
};

export const getCommunity = (communityId) => async dispatch => {
  const response = await fetch(`/api/communities/${communityId}`);
  if (response.ok) {
    const community = await response.json();
    dispatch(loadCommunity(community));
    return response;
  };
  return response;
};

export const createCommunity = (community) => async dispatch => {
  const response = await fetch('/api/communities/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(community)
  });
  if (response.ok) {
    const community = await response.json();
    await dispatch(loadCommunity(community));
    await dispatch(sessionActions.addCommunity(community.id))
    return response;
  } else {
    return response;
  };
};

export const updateCommunity = (community) => async dispatch => {
  const body = {name: community.name, description: community.description, image_url: community.image_url};
  const response = await fetch(`/api/communities/${community.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  if (response.ok) {
    const community = await response.json();
    await dispatch(editCommunity(community));
    return response;
  };
  return response;
};

export const deleteCommunity = (communityId) => async dispatch => {
  const response = await fetch (`/api/communities/${communityId}`,{
    method: 'DELETE'
  });
  if (response.ok) {
    await dispatch(sessionActions.authenticate())
    batch(async()=>{
      await dispatch(eventActions.getEvents())
      await dispatch(removeCommunity(communityId))
    })
    return response;
  };
  return response;
};


const initialState = null;

export default function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITIES:
      return action.payload.reduce((obj, community)=>{
        obj[community.id]= community
        return obj
      },{});
    case LOAD_COMMUNITY:
      return {
          ...state,
          [action.payload.id]: {...action.payload}
      };
    case EDIT:
      return {
        ...state,
          [action.payload.id]: {...action.payload}
      };
    case DELETE:
      const newCommunities = {...state}
      delete newCommunities[action.payload]
      return {...newCommunities};
    default:
      return state;
  }
}
