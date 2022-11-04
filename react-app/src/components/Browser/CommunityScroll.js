import React from 'react'
import CommunityLine from './CommunityLine'

export default function CommunityScroll({communities}) {

  return (
    <div className='scroll'>
      <div className='scroll-section-title'>Communities</div>
      {
        Object.values(communities)
          .map(community =>(
            <CommunityLine key={community.id} community={community}/>
            )
          )
      }
    </div>
  )
};
