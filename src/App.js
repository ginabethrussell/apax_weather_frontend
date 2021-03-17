import React from 'react';
import { Route } from 'react-router-dom';
import {ProtectedRoute} from './utils/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Weather from './components/Weather';

import './App.css';

function App() {
  return (
    <div className="App">
     <main>
        <Route exact path='/' component={Login} />
        <Route path='/signup' component={Signup} />
        <ProtectedRoute path='/weather' component={Weather} />
      </main>
    </div>
  );
}

export default App;
