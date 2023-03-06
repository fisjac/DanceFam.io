import React from 'react'
import ModalWrapper from '../../../../../context/Modal/Modal';
import AddVenueForm from '../AddVenueForm'


import VenueLine from './VenueLine';

export default function Scroll({data}) {
  if (data) {
      return (
        <div className='modal-left-section'>
          <div className='select-venue-header'>Select a Venue</div>
          <div className='modal-eventscroll'>
            {Object.values(data).map(venue => (
              <VenueLine
                key={venue.id}
                venue={venue}
                />
              ))
            }
            <div className='center'>
              <ModalWrapper
                form={<AddVenueForm/>}
                header='Add a venue'
                >
                <div className='modal-clickable-icon'>
                  <i className="fa-solid fa-plus"></i>
                </div>
              </ModalWrapper>
            </div>
          </div>
        </div>

      );
  } else {
    return (
      <div className='modal-eventscroll'>
        {<div className='no-events'>Loading...</div>}

      </div>
    )
  };
};
