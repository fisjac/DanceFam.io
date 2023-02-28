import React from 'react'
import ModalWrapper from '../../../../context/Modal/Modal';
import AddVenueForm from '../../forms/AddVenueForm'


import VenueLine from './VenueLine';

export default function Scroll({data}) {
  if (data) {
      return (
        <div className='modal-eventscroll'>
          {Object.values(data).map(venue => (
            <VenueLine
              key={venue.id}
              venue={venue}
              />
            ))
          }
        <ModalWrapper
          form={<AddVenueForm/>}
          header='Add a venue'
          >
          <div className='clickable-icon center'>
            <i className="fa-solid fa-plus"></i>
          </div>
        </ModalWrapper>
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
