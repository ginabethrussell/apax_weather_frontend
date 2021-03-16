import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {ProtectedRoute} from './utils/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Weather from './components/Weather';
import Splash from './components/Splash';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Splash} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <ProtectedRoute path='/weather' component={Weather} />
    </div>
  );
}

export default App;
