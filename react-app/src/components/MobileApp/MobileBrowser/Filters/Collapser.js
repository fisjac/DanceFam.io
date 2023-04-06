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
    props.expander(val => !val)
    document.removeEventListener('touchstart', closeListener)
  }
  const closeListener = (e) => {
    const found = drillParent(e.target, 'filter-fieldset')
    if (!found) {
      props.expander(val => !val)
      document.removeEventListener('touchstart',closeListener)
    };
  };
  const open = () => {
    props.expander(val=> !val);
    document.addEventListener('touchstart', closeListener)
  }
  const toggleExpander = (e, expanded) => {
    if (expanded) {
      close()
      return
    } else {
      open()
      return
    }
  };

  return (
    <div
      className='filter-fieldset'
      onClick={(e)=> {
        e.stopPropagation()
      }}
      >
      <div
        className='filter-header'

        onClick={(e)=>{
          console.log('clicking header')
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
