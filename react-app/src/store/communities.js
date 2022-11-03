import * as sessionActions from './session';

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
    dispatch(loadCommunity(community));
    dispatch(sessionActions.addCommunity(community.id))
    return response;
  } else {
    return response;
  };
};

export const updateCommunity = (community) => async dispatch => {
  const response = await fetch(`/api/communities/${community.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: community
  });
  if (response.ok) {
    const community = await response.json();
    dispatch(editCommunity(community));
    dispatch(loadCommunities())
    return response;
  };
  return response;
};

export const deleteCommunity = (communityId) => async dispatch => {
  const response = await fetch (`api/communities/${communityId}`,{
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(deleteCommunity(communityId))
    return response;
  };
  return response;
};


const initialState = {allCommunities: null, singleCommunity: null};

export default function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITIES:
      const allCommunities = action.payload.reduce((obj, community)=>{
        obj[community.name]= community
        return obj
      },{})
      return {...state, allCommunities};
    case LOAD_COMMUNITY:
      return {
        allCommunities: {
          ...state.allCommunities,
          [action.payload.name]: {
            id: action.payload.id,
            memberCount: action.payload.memberCount,
            name: action.payload.name,
            owner: action.payload.owner
          }
        },
        singleCommunity: {...action.payload}
      };
    case EDIT:
      return {
        allCommunities: {
          ...state.allCommunities,
          [action.payload.name]: {
            id: action.payload.id,
            memberCount: action.payload.memberCount,
            name: action.payload.name,
            owner: action.payload.owner
          }
        },
        singleCommunity: {...action.payload}
      };
    case DELETE:
      return {allCommunities: {...state.allCommunities, [action.payload]: null}, singleCommunity: null};
    default:
      return state;
  }
}
