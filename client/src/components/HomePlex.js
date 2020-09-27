// Renders Home content for logged in users
// Renders Splash for users who are not logged in
import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Home';
import SplashPage from './SplashPage';

const HomePlex = () => {
  const loggedOut = useSelector(state => !state.authentication.id);
  return (
    <Route
      exact path="/"
      render={() => loggedOut ? <SplashPage/> : <Home/>}/>

  )
}

export default HomePlex;
