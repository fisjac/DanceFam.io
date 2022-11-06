import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


export default function Communities({communities}) {
  const history = useHistory();
  const userCommunities = useSelector(state=>state.session.user.communities);
  return (
    <>
      <div className='planner-title'>Your Communities</div>
      {Object.keys(userCommunities).map(communityId=>(
      <div key={communityId} className='event-box' onClick={()=>history.push(`/${communityId}`)}>
        <div className='event-box-header'>
          <div className='event-box-image' style={{backgroundImage: `url(${communities[communityId].imageUrl})`}}></div>
          <div className='event-box-title'>{communities[communityId].name}</div>
        </div>
      </div>
      ))}
    </>
  )
}
