import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import ModalWrapper from '../../context/Modal'
import * as communityActions from '../../store/communities';
import CreateEventForm from './forms/CreateEventForm';
import EventScroll from './EventScroll';

import './CommunityPage.css'

export default function CommunityPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const communityName = params.community.replace('-', ' ');

  const allEvents = useSelector(state=>state.events.allEvents);
  const allCommunities = useSelector(state=>state.communities.allCommunities);
  const singleCommunity = useSelector(state=>state.communities.singleCommunity);
  const userId = useSelector(state=>state.session.user.id)

  const communityId = allCommunities[communityName].id;
  useEffect(()=> {
    console.log('in communityPage useEffect')
    dispatch(communityActions.getCommunity(communityId));
    console.log('loaded singleCommunity')
  },[dispatch, communityId, allEvents])

  return singleCommunity && (
    <div className='community-page-main'>
      <div className='community-page-top-section'>
        <div className='community-page-title'>{singleCommunity.name}</div>
        <div className='community-page-header'>
          <div className='community-page-image'></div>
          <div className='community-page-details'>
            <div className='community-page-membercount'>
                {singleCommunity.memberCount} Members
            </div>
            <div>
              Owner: {`${singleCommunity.owner.firstName} ${singleCommunity.owner.lastName}`}
            </div>
          </div>
          <div className='community-page-right-icons'>
          {userId === singleCommunity.owner.id && (
              <ModalWrapper form={<CreateEventForm communityId={communityId}/>}>
                <div className='add-button'><i className="fa-solid fa-plus"></i></div>
              </ModalWrapper>
            )}
          </div>
        </div>
      </div>
      <EventScroll showCommunity={false} events={Object.keys(singleCommunity.events).map(id=>allEvents[id])}/>
    </div>
  )
}
