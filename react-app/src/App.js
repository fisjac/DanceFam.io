import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Splash from './components/splash/Splash';
import { authenticate } from './store/session';
import Browser from './components/Browser';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import * as communityActions from './store/communities';
import * as eventActions from './store/events';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return loaded && (
    <BrowserRouter>
      <Switch>
        <Route exact path='/welcome'>
          <Splash />
          <Footer />
        </Route>
        <ProtectedRoute>
          <Route path='/'>
            <NavBar/>
            <Browser/>
            <Footer/>
          </Route>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
