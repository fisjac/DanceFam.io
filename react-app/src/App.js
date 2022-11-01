import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Splash from './components/splash/Splash';
import { authenticate } from './store/session';
import Browser from './components/Browser';
import Footer from './components/Footer';
import CommunityPage from './components/CommunityPage';
import EventPage from './components/EventPage';

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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Splash />
          <Footer />
        </Route>

        <Route exact path='/home'>
          <NavBar/>
          <Browser/>
          <Footer/>
        </Route>

        <Route path='/:community'>
          <NavBar/>
          <CommunityPage/>
        </Route>

        <Route path='/:community/events/:eventId'>
          <NavBar/>
          <EventPage/>
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
