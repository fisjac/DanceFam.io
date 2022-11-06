import React from 'react'
import { useSelector } from 'react-redux'
import CommunityLine from './CommunityLine'
import EventScroll from './EventScroll'

export default function CommunityScroll() {
  console.log('in Main/CommunityScroll Component')
  const communities = useSelector(state=>state.communities);
  const events = useSelector(state=>state.events);

  return (
    <>
    <div className='communityscroll-title'>Communities</div>
    <div className='scroll'>
      {
        Object.values(communities)
          .map(community =>(
            <CommunityLine key={community.id} community={community}/>
            )
          )
      }
    {<EventScroll showCommunity={true} events={events}/>}
    </div>
    </>
  )
};
