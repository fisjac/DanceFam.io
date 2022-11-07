import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import * as communityActions from '../../store/communities';
import ModalWrapper from '../../context/Modal'
import defaultImage from '../../static/dancing_couple1.svg'

export default function EventLine({community}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state=>state.session.user.id);
  console.log(community)
  return (
    <div
      className='eventline-container'
      onClick={(e)=>{
        if(e.target.className.includes('eventline')) {
          history.push(`/${community.id}`)
        }

      }}
      >
      <div className='eventline-body'>
        <div className='eventline-body-left'>
          <img
              className='eventline-img'
              src={community.imageUrl===null?defaultImage:community.imageUrl}
              alt="community_img"
              onError={e =>e.currentTarget.src = defaultImage}
              />

          <div className='eventline-details'>
            <div className='eventline-name'>{community.name}</div>
            <div className='eventline-attendees'>
              {community.memberCount} members
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
