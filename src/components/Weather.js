import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import { UserContext } from "../contexts/UserContext";
import {Grid, Paper, Typography } from "@material-ui/core";
import animation from "../rainy-6.svg"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  welcome: {
    padding: 20,
    height: "30vh",
    width: "50%",
    minWidth: 280,
    maxWidth: 500,
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
      fontFamily: "Noto sans",
      color: "#2e3451",
      textAlign: "center",
  }
}));
function Weather() {
    const { zipcodes, setZipcodes, weatherData, setWeatherData} = useContext(UserContext);
    const [userid, setUserid] = useState("");
    const [zipApiErr, setZipApiErr] = useState("");

    const classes = useStyles();

    const handleAddZipcode = (zipcode) => {
        console.log("current zipcodes", zipcodes);
        console.log("adding ", zipcode)
        setZipApiErr("");
        const isNewZip = zipcodes.filter(zip => zip.zipcode === zipcode);
        console.log("Checking isNewZip", isNewZip);
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
            console.log(zipcodes)
            const locations = []
            zipcodes.forEach(zip => {
                console.log("calling API for", zip.zipcode)
                // make sure new zipcode not already in weatherData
                if (!weatherData.find(location => location.zipcode === zip.zipcode)){
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.zipcode}&units=imperial&appid=11d7ddf7e962666cde4937e2b28eca42`)
                .then(res => {
                    const locationData = {
                        locationid: zip.locationid,
                        zipcode: zip.zipcode,
                        name: res.data.name,
                        feelsLike: res.data.main.feels_like,
                        temp: res.data.main.temp,
                        tempMax: res.data.main.temp_max,
                        tempMin: res.data.main.temp_min,
                        weatherIcon: res.data.weather[0].icon,
                        weatherMain: res.data.weather[0].main,
                        weatherDescription: res.data.weather[0].description,
                        windSpeed: res.data.wind.speed,
                    };
                    locations.push(locationData);
                    setZipApiErr("");
                })
                .then(() =>{
                    setWeatherData([...weatherData, ...locations]);
                })
                .catch(err => {
                    console.log(err);
                    // open weather api doesn't find zipcode
                    setZipApiErr("Zipcode location not found");
                    // delete invalid zip from db
                    handleDelete(zip.locationid)
                })
                }
                
            })   
        }    
    }, [zipcodes]);

    return (
        <Grid container direction="column">
            <Grid item><Header handleAddZipcode={handleAddZipcode} zipApiErr={zipApiErr}/></Grid>
            <Grid item container>
                <Grid item xs={2} sm={2}/> 
                <Grid item xs={8} sm={8}> 
                {
                    // Display image and prompt if no locations found
                    weatherData.length < 1 ? 
                    <Paper className={classes.welcome} elevation={10}>
                        <img width="40%" src={animation} alt="weather icon animation"/>
                       <Typography className={classes.textStyle} variant="h5">Add a 5-Digit Zipcode in the Toolbar</Typography>
                       <Typography className={classes.textStyle } variant="h5"> Get Current Weather for any US Location</Typography>
                    </Paper> : 
                    <Grid style={{marginTop: '25px'}}container spacing={4}>
                    {console.log(weatherData)}
                        {   
                            weatherData.map(location => (
                            <Grid key={location.locationid} item xs={12} sm={6} md={4}>
                                <WeatherCard location={location} handleDelete={handleDelete}/>
                            </Grid>
                            ))
                        }
                    </Grid>
                }      
                </Grid>
                <Grid item xs={2} sm={2} /> 
            </Grid>
        </Grid>
    )
}

export default Weather;
