import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '../../static/DanceFamBrushNoText.svg';
import title from '../../static/DanceFamTitle.svg';
import Communities from './Communities';

export default function LeftBar() {
  const history = useHistory()
  const allEvents = useSelector(state=> state.events.allEvents)
  const allCommunities = useSelector(state=> state.communities.allCommunities)

  return (
    <div className='left-bar'>
      <div className='left-bar-logo-container' onClick={()=>history.push('/')}>
        <img className='left-bar-logo' src={logo} alt='logo'/>
        <img className='left-bar-logo-title' src={title} alt='title'/>
      </div>

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
        <Communities/>
      </div>
    </div>
  );
};
