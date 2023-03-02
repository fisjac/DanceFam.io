import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as eventActions from '../../../store/events';
import ModalWrapper from '../../../context/Modal/Modal'
import EditEventForm from '../forms/EditEventForm';
import { getUtcTime } from '../../utils/DateFuncs';

import { GoogleMapsMapContext } from '../../../context/Maps/MapsLoader';
import defaultImage from '../../../static/dancing_couple1.svg'
import { SelectorsContext } from '../../../context/Maps/Selector';


export default function EventLine({event}) {
  const { map } = useContext(GoogleMapsMapContext);
  const venues = useSelector(state=>state.venues);
  const { setHoveredId, setSelectedId} = useContext(SelectorsContext);
  const dispatch = useDispatch();
  const start = new Date(event.start);
  const user = useSelector(state=>state.session.user);

  return (
    <>
      <div
        className='eventline-container'
        onClick={(e)=>{
          e.preventDefault()
          if (e.target.className.includes('eventline')) {
            setSelectedId(event.venueId);
            map.panTo({lat: venues[event.venueId].lat, lng: venues[event.venueId].lng});
          };
        }}
        onMouseEnter={(e)=>{
          if (e.target.className.includes('eventline') ) {
            setHoveredId(event.venueId)
          };
        }
        }
        onMouseLeave={(e)=> {
          if (e.target.className.includes('eventline')) {
            setHoveredId(event.null)
          }}
        }
        >
        <div className='eventline-body'>
          <img
            className='eventline-img'
            src={event.imageUrl===null?defaultImage:event.imageUrl}
            alt="event_img"
            onError={e =>e.currentTarget.src = defaultImage}
            />
          <div className='eventline-details'>
            <div className='eventline-name'>{event.name}</div>
            <div className='eventline-date'>{getUtcTime(start)}</div>
          </div>
          {user && user.id === event.organiserId && (<div className='eventline-body-right'>
            <ModalWrapper
            header='Edit this Event'
            form={<EditEventForm event={event}/>}
            >
              <div className='clickable-icon'>
                <i className="fa-solid fa-pen"></i>
              </div>
            </ModalWrapper>
              <div className='clickable-icon' onClick={async (e)=>{
                e.stopPropagation()
                if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
                  const response = await dispatch(
                    eventActions.deleteEvent(
                      event.id));
                  if (response.ok) alert(`${event.name} successfully deleted.`);
                }
                }}
                >
                <i className="fa-solid fa-trash"></i>
              </div>
          </div>)}
        </div>
      </div>
    </>
  )
}
