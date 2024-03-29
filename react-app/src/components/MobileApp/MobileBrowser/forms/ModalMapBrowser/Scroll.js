import React from 'react'
import ModalWrapper from '../../../../../context/Modal/Modal';
import AddVenueForm from '../AddVenueForm'


import VenueLine from './VenueLine';

export default function Scroll({data}) {
  if (data) {
      return (
        <div className='modal-left-section__mobile'>
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
                bespokeClassName='create-venue__mobile'
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
