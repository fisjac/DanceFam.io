import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import ModalWrapper from '../../context/Modal'
import * as communityActions from '../../store/communities';
import CreateEventForm from './forms/CreateEventForm';

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


  return singleCommunity && (
    <div className='community-page-main'>
      <div className='community-page-header'>
        <div className='community-page-image'></div>
        <div className='community-page-title'>{singleCommunity.name}</div>
        <ModalWrapper form={<CreateEventForm/>}>
          <div className='icon-button'><i class="fa-solid fa-plus"></i></div>
        </ModalWrapper>

      </div>
      <div className='community-page-body'>
        <div className='community-page-membercount'>{singleCommunity.memberCount} Members</div>
        <div>Owner: {}</div>
      </div>
    </div>
  )
}
