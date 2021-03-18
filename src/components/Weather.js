import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Header from './Header';
import WeatherCard from './WeatherCard';
import { UserContext } from '../contexts/UserContext';
import {Grid } from '@material-ui/core';

function Weather() {
    const { zipcodes, setZipcodes, weatherData, setWeatherData} = useContext(UserContext);
    const [userid, setUserid] = useState('');

    const addZipcode = (zipcode) => {
        const isNewZip = zipcodes.filter(zip => zip.zipcode === zipcode);
        if (isNewZip.length < 1){
            axiosWithAuth().post(`/locations/location/${userid}/zipcode/${zipcode}`)
                .then(res => {
                    console.log(res);
                    axiosWithAuth().get("/locations/getuserlocations")
                        .then(res => {
                            console.log(res.data);
                            setZipcodes(res.data.map(item => {
                                const newLocationObj =  {
                                    locationid: item.locationid,
                                    zipcode: item.zipcode
                                }
                            return newLocationObj;
                            }));
                        })
                        .catch(err => console.log(err))
                    })
                .catch(err => console.log(err))
        }   
    }

    const handleDelete = (locationid) => {
        console.log(locationid);
        axiosWithAuth().delete(`locations/location/${locationid}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        setZipcodes(zipcodes.filter(zipObj => zipObj.locationid !== locationid));
        setWeatherData(weatherData.filter(weatherDataObj => weatherDataObj.locationid !== locationid));
    }

    const cleanAndAddData = (weatherInfo, zipcodeObj) => {
        const locationData = {
            locationid: zipcodeObj.locationid,
            zipcode: zipcodeObj.zipcode,
            name: weatherInfo.name,
            feelsLike: weatherInfo.main.feels_like,
            temp: weatherInfo.main.temp,
            tempMax: weatherInfo.main.temp_max,
            tempMin: weatherInfo.main.temp_min,
            weatherIcon: weatherInfo.weather[0].icon,
            weatherMain: weatherInfo.weather[0].main,
            weatherDescription: weatherInfo.weather[0].description,
            windSpeed: weatherInfo.wind.speed,
        }
        setWeatherData([...weatherData, locationData]); 
    }

    useEffect(() => {
        axiosWithAuth().get("/users/getuserinfo")
        .then(res => {
            console.log(res.data);
            setUserid(res.data.userid);
            setZipcodes(res.data.locations.map(item => {        
               const newLocationObj =  {
                    locationid: item.locationid,
                    zipcode: item.zipcode
                }
                return newLocationObj    
            }));
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (zipcodes.length > 0){
            zipcodes.forEach(zip => {
                axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip.zipcode}&units=imperial&appid=11d7ddf7e962666cde4937e2b28eca42`)
                .then(res => {
                    cleanAndAddData(res.data, zip);
                })
                .catch(err => console.log(err));
            })
        }    
    }, [zipcodes]);

    return (
        <Grid container direction="column">
            <Grid item><Header addZipcode={addZipcode}/></Grid>
            <Grid item container>
                <Grid item xs={2} sm={2}/> 
                <Grid item xs={8} sm={8}> 
                    <Grid style={{marginTop: '25px'}}container spacing={4}>
                        {
                           
                            weatherData.map(location => (
                            <Grid key={location.locationid} item xs={12} sm={6} md={4}>
                                <WeatherCard location={location} handleDelete={handleDelete}/>
                            </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={2} sm={2} /> 
            </Grid>
        </Grid>
    )
}

export default Weather;
