import React from 'react'
import { useSelector } from 'react-redux';

export default function LeftBar() {
  const allEvents = useSelector(state=> state.events.allEvents)
  const allCommunities = useSelector(state=> state.communities.allCommunities)

  return (
    <div className='left-bar'>
      <div className='planner'>
        <div className='planner-title'>Your Next Event</div>
        <div className='event-box'>
          <div className='event-box-header'>
            <div className='event-box-image'>IMG</div>
            <div className='event-box-title'>Community Name</div>
          </div>
          <div className='event-box-date'>Some date</div>
          <div className='event-box-Name'>Event Title</div>
          <div className='event-box-Community'>Community Name</div>
          <div className='event-box-address'>Address Info</div>
        </div>
        <div className='planner-title'>Your Communities</div>
        <div className='event-box'>
          <div className='event-box-header'>
            <div className='event-box-image'>IMG</div>
            <div className='event-box-title'>Community Name</div>
          </div>
        </div>
      </div>
    </div>
  );
};
