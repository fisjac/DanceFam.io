import React from 'react'

const drillParent = (node, className) => {
  const parent = node.parentNode;
  if (!node.parentNode) {
    return false
  }
  if (parent.className === className) {
    return true
  }
  return drillParent(parent, className)
};

export default function Collapser (props) {

  const close = () => {
    document.removeEventListener('touchstart',closeListener)
    props.expander(false)
  }
  const closeListener = (e) => {
    const found = drillParent(e.target, 'filter-fieldset') //look for a parent element with a class of 'filter-fieldset'
    if (!found) {
      document.removeEventListener('touchstart',closeListener)
      props.expander(false)
    };
  };
  const open = () => {
    props.expander(true);
    document.addEventListener('touchstart', closeListener)
  }
  const toggleExpander = (e, expanded) => {
    if (expanded) {
      close()
    } else {
      open()
    }
  };

  return (
    <div className='filter-fieldset'>
      <div
        className='filter-header'
        onClick={(e)=>{
          toggleExpander(e, props.expanded)
        }}
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
