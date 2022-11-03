import React from 'react'
import { useSelector } from 'react-redux'

export default function Communities() {
  const userCommunities = useSelector(state=>state.session.user.communities)

  return (
    <>
      <div className='planner-title'>Your Communities</div>
      <div className='event-box'>
        <div className='event-box-header'>
          <div className='event-box-image'>IMG</div>
          <div className='event-box-title'>Community Name</div>
        </div>
      </div>
    </>
  )
}
