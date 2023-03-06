import React from 'react'

export default function Collapser (props) {
  return (
    <div
      className='filter-fieldset'
      >
      <div
        className='filter-header'
        onClick={()=>props.expander(val=>!val)}
        >
          <div
            className='collapse-button'
            id={props.expanded ? 'expanded' : ''}
            >
            <i className="fa-solid fa-caret-right"></i>
          </div>
          <div className='title'>
            {props.title}
          </div>
        </div>

        { props.expanded &&
          <div className='children-container'>
            {props.children}
          </div>
        }
    </div>
  )
};
