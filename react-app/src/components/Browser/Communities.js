import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function Communities() {
  const history = useHistory();
  const userCommunities = useSelector(state=>state.session.user.communities);
  return (
    <>
      <div className='planner-title'>Your Communities</div>
      {Object.keys(userCommunities).map(communityName=>(
      <div key={communityName} className='event-box' onClick={()=>history.push(`/${communityName.replaceAll(' ','-')}`)}>
        <div className='event-box-header'>
          <div className='event-box-image'>IMG</div>
          <div className='event-box-title'>{communityName}</div>
        </div>
      </div>
      ))}
    </>
  )
}
