import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import LoadMaps from './context/Maps/MapsLoader';
import DesktopApp from './components/DesktopApp/';
import MobileApp from './components/MobileApp/';
import Splash from './components/splash/Splash';
import { authenticate } from './store/session';
import {getKey} from './store/keys'
import { getStyles } from './store/styles';
import { getEvents } from './store/events';
import { getTypes } from './store/types';
import PrivacyPolicy from './components/PrivacyPolicy';
import { getVenues } from './store/venues';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getStyles());
      await dispatch(getTypes());
      await dispatch(getKey());
      await dispatch(getEvents());
      await dispatch(getVenues());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(()=> {
    function handleResize () {
      setwidth(window.innerWidth)
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  if (!loaded) {
    return null;
  }

  return loaded && (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Splash />
        </Route>
        <Route path='/app'>
          <LoadMaps>
            {width >= 500 &&
              <DesktopApp/>
            }
            {width < 500 &&
            <MobileApp/>
            }
          </LoadMaps>
          <Route path='/app/privacy'>
            <PrivacyPolicy/>
          </Route>
        </Route>

      </Switch>
    </BrowserRouter>

  );
}

export default App;
