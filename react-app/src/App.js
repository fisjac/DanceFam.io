import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import LoadMaps from './context/Maps/MapsLoader';
import NavBar from './components/NavBar';
import Splash from './components/splash/Splash';
import { authenticate } from './store/session';
import Browser from './components/Browser';
import Footer from './components/Footer';
import {getKey} from './store/keys'
import { getStyles } from './store/styles';
import BoundsProvider from './context/Maps/Bounds';
import { getEvents } from './store/events';
import { getTypes } from './store/types';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getStyles())
      await dispatch(getTypes())
      await dispatch(getKey())
      await dispatch(getEvents())
      setLoaded(true);
    })();
  }, [dispatch]);

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
            <NavBar/>
            <BoundsProvider>
              <Browser/>
            </BoundsProvider>
          </LoadMaps>
          <Footer/>
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
