import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import { UserContext } from "../contexts/UserContext";
import {Paper, Typography } from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import animation from "../rainy-6.svg"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    dashboardContainer: {
        display: "flex",
        flexDirection: "column"
    },
    welcome: {
        padding: 10,
        height: "auto",
        width: "70%",
        minWidth: 260,
        maxWidth: 350,
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
  },
    textStyle: {
      fontFamily: "Noto sans",
      color: "#2e3451",
      textAlign: "center",
    },
    weatherCardContainer: {
        paddingTop: "25px",
        paddingBottom: "75px",
        width: "90%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    weatherCardWrapper: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "space-around"
    },
    weatherCard: {
        width: "25%",
        minWidth: 280,
        maxWidth: 350,
        margin: 25
    }
}));
function Weather() {
    const { zipcodes, setZipcodes, weatherData, setWeatherData} = useContext(UserContext);
    const [userid, setUserid] = useState("");
    const [zipApiErr, setZipApiErr] = useState("");
    const classes = useStyles();

    const handleRemoveError = () => {
        setZipApiErr("");
    }

    const handleAddZipcode = (zipcode) => {
        setZipApiErr("");
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
            const locations = []
            zipcodes.forEach(zip => {
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
                    setZipApiErr(`No weather data found for Zipcode ${zip.zipcode}`);
                    // delete invalid zip from db
                    handleDelete(zip.locationid)
                })
                }    
            })   
        }    
    }, [zipcodes]);

    return (
        <div className="dashboardContainer">
            <Header handleAddZipcode={handleAddZipcode} />
            {
                zipApiErr.length > 0 && 
                <Alert style={{fontSize: "16px"}}severity="error" onClose={() => handleRemoveError()}>
                    <AlertTitle>Error</AlertTitle>
                        <strong>{zipApiErr}</strong> - please enter a new zipcode.
                </Alert>
            }
            <div className={classes.weatherCardContainer}>
                {
                    // Display animation and prompt if no locations found
                    zipcodes.length < 1 ?
                    <div className="welcomeWrapper">
                        <Paper className={classes.welcome} elevation={10}>
                            <img width="65%" src={animation} alt="weather icon animation"/>
                        <Typography className={classes.textStyle} variant="h5">Add a 5-Digit Zipcode in the Toolbar</Typography>
                        <Typography className={classes.textStyle } variant="h5"> Get Current Weather for any US Location</Typography>
                        </Paper>
                    </div> : 
                    <div className={classes.weatherCardWrapper}>
                        {   
                            weatherData.map(location => (
                            <div className={classes.weatherCard} key={location.locationid} >
                                <WeatherCard location={location} handleDelete={handleDelete}/>
                            </div>
                            ))
                        }
                    </div>
                }      
                </div>
            </div>
    )
}

export default Weather;
