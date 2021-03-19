import React, {useState} from "react";
import { Route } from "react-router-dom";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Weather from "./components/Weather";
import { UserContext } from "./contexts/UserContext";

import "./App.css";


function App() {
  const [username, setUsername] = useState('');
  const [zipcodes, setZipcodes] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const userContextValues = {
    username,
    setUsername,
    zipcodes, 
    setZipcodes,
    weatherData,
    setWeatherData
  }
  return (
    <div className="App">

      <UserContext.Provider value={userContextValues}>

        <Route exact path='/' component={Login} />
        <Route path='/signup' component={Signup} />
        <ProtectedRoute path='/welcome' component={Welcome} />
        <ProtectedRoute path='/weather' component={Weather} />

      </UserContext.Provider>
    
    </div>
  );
}

export default App;
