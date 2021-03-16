import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Weather() {
    const [locations, setLocations] = useState([]);
    const [zipcodes, setZipcodes] = useState([]);
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axiosWithAuth().get("/locations/getuserlocations")
        .then(res => {
            console.log(res.data);
            setLocations(res.data);
            setZipcodes(res.data.map(item => item.zipcode));
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${"40515"}&units=imperial&appid=11d7ddf7e962666cde4937e2b28eca42`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        

    }, [zipcodes]);

    return (
        <div>
            Weather Dashboard
        </div>
    )
}

export default Weather;
