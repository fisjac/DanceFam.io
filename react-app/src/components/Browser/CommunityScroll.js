import React from 'react'
import CommunityLine from './CommunityLine'
import EventScroll from './EventScroll'

export default function CommunityScroll({communities, events}) {

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
