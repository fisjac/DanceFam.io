import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as communityActions from '../store/communities';
import LeftBar from './Browser/LeftBar';

export default function CommunityPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const communityName = params.community.replace('-', ' ');
  useEffect(()=> {
    dispatch(communityActions.getCommunities())
    const communityId = allCommunities[communityName].id;
    dispatch(communityActions.getCommunity(communityId));
  },[dispatch])

  const allCommunities = useSelector(state=>state.communities.allCommunities);
  const singleCommunity = useSelector(state=>state.communities.singleCommunity);
  if (!allCommunities || !singleCommunity) return null;


  return (
    <>
      <LeftBar/>
      <div>{params.community}</div>
    </>
  )
}
