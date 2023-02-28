import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '../../../static/DanceFamBrushNoText.svg';
import title from '../../../static/DanceFamTitle.svg';

import { toggleStyle } from '../../../store/styles';
import { toggleType } from '../../../store/types';

export default function LeftBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const types = useSelector(state=>state.types);
  const styles = useSelector(state=>state.styles);

  useEffect(()=> {
    localStorage.setItem('types',JSON.stringify(types))
    localStorage.setItem('styles',JSON.stringify(styles))
  },[types,styles])

  return (
    <div className='left-bar'>
      <div className='left-bar-logo-container' onClick={()=>history.push('/')}>
        <img className='left-bar-logo' src={logo} alt='logo'/>
        <img className='left-bar-logo-title' src={title} alt='title'/>
      </div>

      <div className='planner scroll'>
        {/* <div>Calendar Selector</div> */}
        <div className='leftBar-fieldset'>
          <div className='filter-header'>Event Type</div>
          {Object.keys(types).map((type)=>(
            <div className='checkbox-line'>
              <div
              className={`checkbox-input ${types[type]?'checked': 'unchecked'}`}
              onClick={()=>{
                dispatch(toggleType(type))
               }}
              >
                {<i className="fa-solid fa-check"></i>}
              </div>
              <div className='checkbox-label'>{type}</div>
            </div>
          ))}
        </div>
        <div className='leftBar-fieldset'>
          <div className='filter-header'>Dance Styles</div>
          {Object.keys(styles).map((style)=>(
            <div className='checkbox-line'>
              <div
               className={`checkbox-input ${styles[style]?'checked': 'unchecked'}`}
               onClick={()=>{
                dispatch(toggleStyle(style))
               }}
               >
                {<i className="fa-solid fa-check"></i>}
              </div>
              <div className='checkbox-label'>{style}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
