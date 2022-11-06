import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import * as communityActions from '../store/communities';
import * as eventActions from '../store/events';

const DataContext = React.createContext();

export default function DataProvider({children}) {
  const dispatch= useDispatch();
  useEffect(async ()=>{
    await dispatch(eventActions.getEvents())
    await dispatch(communityActions.getCommunities())
  },[dispatch])

  const events = useSelector(state=>state.events);
  const communities = useSelector(state=>state.communities);

  return (
    <DataContext.Provider value={{communities, events}}>
      {children}
    </DataContext.Provider>
  );
};
