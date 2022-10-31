import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Splash from './components/splash/Splash';
import { authenticate } from './store/session';
import Browser from './components/Browser';
import Footer from './components/Footer';


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
      <NavBar />
      <Route exact path='/'>
       <Splash />
       <Footer />
      </Route>
      <Route exact path='/home'>
        <NavBar/>
        <Browser/>
        <Footer/>
      </Route>
      <Route path='/communities/:community'>
        <CommunityPage/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
