import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';


import ModalWrapper from '../../context/Modal'
import * as communityActions from '../../store/communities';
import CreateEventForm from './forms/CreateEventForm';
import EditCommunityForm from './forms/EditCommunityForm';
import EventScroll from './EventScroll';

import './CommunityPage.css'

export default function CommunityPage({events, communities}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const communityName = params.community.replaceAll('-', ' ');
  const userId = useSelector(state=>state.session.user.id)
  const singleCommunity = communities[communityName]

  if (!singleCommunity) {
    return <Redirect to='/'/>
  } else {
    return (
      <div className='community-page-main'>
        <div className='community-page-top-section'>
          <div className='community-page-header sticky'>
            <div className='community-page-title'>{singleCommunity.name}</div>
            <div className='community-page-right-icons'>
            {userId === singleCommunity.owner.id && (
                <>
                <ModalWrapper
                  form={<CreateEventForm communityId={singleCommunity.id}/>}
                  header='Create a new Event'
                  >
                  <div className='icon-button'><i className="fa-solid fa-plus"></i></div>
                </ModalWrapper>
                <ModalWrapper
                  form={<EditCommunityForm community={singleCommunity}/>}
                  header='Edit this Community'
                  >
                  <div className='icon-button'><i className="fa-solid fa-pen"></i></div>
                </ModalWrapper>
                <div className='icon-button' onClick={
                  async (e)=>{
                    e.stopPropagation()
                    if (window.confirm(`Are you sure you want to delete ${singleCommunity.name}?`)) {
                    const response = await dispatch(
                      communityActions.deleteCommunity(singleCommunity.id, singleCommunity.name)
                    );
                    if (response.ok) {
                      history.push('/')
                      alert(`${singleCommunity.name} successfully deleted.`)
                    };
                  }}
                } ><i className="fa-solid fa-trash"></i></div>
                </>
              )}
            </div>
          </div>
          <div className='community-page-image' style={{backgroundImage: `url(${singleCommunity.imageUrl})`}}></div>
          <div className='community-page-details'>
            <div className='community-page-membercount'>
                {singleCommunity.memberCount} Members
            </div>
            <div>
              Owner: {`${singleCommunity.owner.firstName} ${singleCommunity.owner.lastName}`}
            </div>
          </div>
        </div>
        {singleCommunity.events && <EventScroll showCommunity={false} events={Object.keys(singleCommunity.events).map(id=>events[id])}/>}
      </div>
    )
  };
}
