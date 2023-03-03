import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toggleStyle } from '../../../store/styles';
import { toggleType } from '../../../store/types';
import Collapser from './Collapser';

export default function Filter() {
  const history = useHistory();
  const dispatch = useDispatch();
  const types = useSelector(state=>state.types);
  const styles = useSelector(state=>state.styles);

  const [dateFilterExpanded, setDateFilterExpanded] = useState(false);
  const [typeFilterExpanded, setTypeFilterExpanded] = useState(false);
  const [styleFilterExpanded, setStyleFilterExpanded] = useState(false);

  useEffect(()=> {
    localStorage.setItem('types',JSON.stringify(types))
    localStorage.setItem('styles',JSON.stringify(styles))
  },[types,styles])

  return (
    <div className='filter-bar'>
      <div className='planner'>
        {/* <Collapser
          title='Date Filter'
          expanded={dateFilterExpanded}
          expander={setDateFilterExpanded}
          >
            Date Filter
        </Collapser> */}
        <Collapser
          title='Event Type'
          expanded={typeFilterExpanded}
          expander={setTypeFilterExpanded}
          >
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
        </Collapser>
        <Collapser
          title='Dance Styles'
          expanded={styleFilterExpanded}
          expander={setStyleFilterExpanded}
          >
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
        </Collapser>
      </div>
    </div>
  );
};
