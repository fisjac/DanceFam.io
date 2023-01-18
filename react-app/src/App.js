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

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getStyles())
      await dispatch(getKey())
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
          <Footer />
        </Route>
          <Route path='/app'>
            <LoadMaps>
              <NavBar/>
              <Browser/>
              <Footer/>
            </LoadMaps>
          </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
