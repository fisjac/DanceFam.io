import React, { useState } from 'react'

export default function DateFilter() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='leftBar-fieldset'>
      <div className='filter-header'>
        DateFilter
      </div>
    </div>
  )
};
