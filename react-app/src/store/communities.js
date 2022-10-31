const LOAD_COMMUNITIES = 'communities/LOAD_ALL';
const LOAD_COMMUNITY = 'communities/LOAD_ONE';
const EDIT = 'communities/EDIT';
const DELETE = 'communities/DELETE';


// Actions
export function load_communities (payload) {
  return {
    type: LOAD_COMMUNITIES,
    payload
  }
};

export function load_community (payload) {
  return {
    type: LOAD_COMMUNITY,
    payload
  }
};

export function edit_community (payload) {
  return {
    type: EDIT,
    payload
  }
};

export function delete_community (payload) {
  return {
    type: DELETE,
    payload
  }
};

// Thunks

export const get_communities = () => async dispatch => {
  const response = await fetch('/api/communities');
  if (response.ok) {
    const communities = await response.json();
    dispatch(load_communities(communities));
    return response;
  };
  return response;
};

export const get_community = (communityId) => async dispatch => {
  const response = await fetch(`/api/communities/${communityId}`);
  if (response.ok) {
    const community = await response.json();
    dispatch(load_community(community));
    return response;
  };
  return response;
};

export const edit_community = (community) => async dispatch => {
  const response = await fetch(`/api/communities/${community.id}`,{
    method: 'PUT',
    header: {'Content-Type': 'application/json'},
    body: community
  });
  if (response.ok) {
    const community = await response.json();
    dispatch(edit_community(community));
    dispatch(load_communities())
    return response;
  };
  return response;
};

export const delete_community = (communityId) => async dispatch => {
  const response = await fetch (`api/communities/${communityId}`,{
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(delete_community(communityId))
    return response;
  };
  return response;
};


initalState = {communities: null, singleCommunity: null};

export default function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITIES:
      return {...state, communities: {...action.payload}};
    case LOAD_COMMUNITY:
      return {...state, singleCommunity: {...action.payload}};
    case EDIT:
      return {...state, singleCommunity: {...action.payload}};
    case DELETE:
      return {communities: {...state.communities, [action.payload]: null}, singleCommunity: null};
    default:
      return state;
  }
}
