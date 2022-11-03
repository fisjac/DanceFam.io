import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import ModalWrapper from '../../context/Modal'
import * as communityActions from '../../store/communities';
import CreateEventForm from './forms/CreateEventForm';
import EventScroll from './EventScroll';

export default function CommunityPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const communityName = params.community.replace('-', ' ');

  const allEvents = useSelector(state=>state.events.allEvents);
  const allCommunities = useSelector(state=>state.communities.allCommunities);
  const singleCommunity = useSelector(state=>state.communities.singleCommunity);

  const communityId = allCommunities[communityName].id;
  useEffect(()=> {
    dispatch(communityActions.getCommunity(communityId));
  },[dispatch])

  console.log(singleCommunity?.events)
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
      <EventScroll showCommunity={false} events={singleCommunity.events.map(id=>allEvents[id])}/>
    </div>
  )
}
