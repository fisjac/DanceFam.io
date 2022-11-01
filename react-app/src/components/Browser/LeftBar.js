import React from 'react'
import { useSelector } from 'react-redux';

export default function LeftBar() {
  const allEvents = useSelector(state=> state.events.allEvents)
  const allCommunities = useSelector(state=> state.communities.allCommunities)

  return (
    <div className='left-bar'>
      <div>Your Next Event</div>
      <div>

      </div>
      <div>Your Communities</div>
    </div>
  );
};
