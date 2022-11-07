import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import defaultImage from '../../static/dancing_couple1.svg'

export default function Communities({communities}) {
  const history = useHistory();
  const userCommunities = useSelector(state=>state.session.user.communities);
  const userCommunityList = Object.keys(userCommunities);

  if (!userCommunityList.length) {
    return <div className='event-box-none'>You're not a member of a community</div>
  }

  return (
    <>
      {Object.keys(userCommunities).map(communityId=>(
        <div key={communityId} className='event-box' onClick={()=>history.push(`/${communityId}`)}>
          <div className='event-box-header'>
          <img
            className='event-box-image'
            src={communities[communityId].imageUrl}
            alt="community_img"
            onError={e =>e.currentTarget.src = defaultImage}
            />
            <div className='event-box-title'>{communities[communityId].name}</div>
          </div>
        </div>
      ))}
    </>
  )
}
