import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {ProtectedRoute} from './utils/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Weather from './components/Weather';
import Splash from './components/Splash';
import video from './movingclouds.mp4';
//import video from './movingclouds.webm'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <video className='fullscreen' autoPlay muted >
        <source src={video} type="video/mp4"/>
      </video> */}
      {/* <Route exact path='/' component={Splash} /> */}
      <Route path='/' component={Login} />
      <Route path='/signup' component={Signup} />
      <ProtectedRoute path='/weather' component={Weather} />
    </div>
  );
}

export default App;
