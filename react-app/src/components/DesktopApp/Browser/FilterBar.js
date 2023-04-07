import React from 'react'

import DropDownWrapper from '../../context/Dropdown/Dropdown.js';


function Types () {
  return (
      <fieldset>
        <div className='checkbox-line'>
          <input
            type='checkbox'
          />
          Class
        </div>
      </fieldset>
  )
}


export default function FilterBar() {
  return (
    <div className='filter-container'>
      <DropDownWrapper menu={<Types/>}>
        <div>
          Event Type
        </div>
      </DropDownWrapper>
      <div>
      Dance Style
      </div>

    </div>
  )
}
