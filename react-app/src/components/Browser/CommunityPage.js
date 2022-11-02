import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as communityActions from '../../store/communities';

export default function CommunityPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const communityName = params.community.replace('-', ' ');
  const allCommunities = useSelector(state=>state.communities.allCommunities);
  const communityId = allCommunities[communityName].id;
  useEffect(()=> {
    dispatch(communityActions.getCommunity(communityId));
  },[dispatch])

  const singleCommunity = useSelector(state=>state.communities.singleCommunity);
  // if (!allCommunities || !singleCommunity) return null;


  return (
    <>
      <div>{params.community}</div>
    </>
  )
}
