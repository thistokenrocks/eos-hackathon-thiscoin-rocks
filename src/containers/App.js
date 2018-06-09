import React from 'react';
import { Switch, Route } from 'react-router-dom'; // withRouter
import ReduxToastr from 'react-redux-toastr'
import Home from './HomeContainer';
import About from './AboutContainer';
import Play from './PlayContainer';
import Map from './MapContainer';
import Rating from './RatingContainer';
import './App.css';
import MapLoaderContainer from './MapLoaderContainer';

const toastr = {
  timeout: 4000,
  newestOnTop: false,
  position: 'bottom-left',
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut'
};

const App = () => (
  <div className="App">
    <ReduxToastr {...toastr} progressBar />
    <MapLoaderContainer />
    <Switch>
       <Route exact path='/' component={Home} />
       <Route exact path='/about' component={About} />
       <Route path='/:mapId/about' component={About} />
       <Route path='/:mapId/map' component={Map} />
       <Route path='/:mapId/play' component={Play} />
       <Route path='/:mapId/rating' component={Rating} />
    </Switch>
  </div>
);

export default App;
