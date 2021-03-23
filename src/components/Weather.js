import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {Paper, Typography } from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header";
import WeatherCard from "./WeatherCard";
import animation from "../rainy-6.svg"

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
    const [userid, setUserid] = useState("");
    const [zipApiErr, setZipApiErr] = useState("");
    const [userHaveLocations, setUserHaveLocations] = useState(true);
    const [weatherData, setWeatherData] = useState([]);
    const [zipcodes, setZipcodes] = useState([]);
    const classes = useStyles();

    // Call Backend API for initial authenticated user's info on page load
    // Sets userid in state
    // Sets flag to false if user has no locations on db
    // Or, adds locations to zipcodes state array
    useEffect(() => {
        axiosWithAuth().get("/users/getuserinfo")
        .then(res => {
            console.log("initial response for logged in user data", res.data);
            console.log(res.data.locations.length);
            if(res.data.locations.length < 1){
                setUserHaveLocations(false);
            }
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

    // Calls Open Weather API for each zipcode in zipcodes state array
    // Executes on initial page load and when zipcodes state value changes
    // Verifies data not already in weatherData state array
    // For each zipcode, creates a location object and pushes to a location array
    // Adds location array to weatherData state array
    // If an error is returned from API, sets an error message to zipApiErr state variable
    // And calls handleDelete with invalid zipcode to remove from zipcodes state array
    // And delete location from Backend API
    useEffect(() => {
        if (zipcodes.length > 0){
            const locations = []
            zipcodes.forEach(zip => {
                console.log(zip);
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
                    setUserHaveLocations(true);   
                })
                .catch(err => {
                    console.log(err);
                    setZipApiErr(`No weather data found for Zipcode ${zip.zipcode}`);
                    handleDelete(zip.locationid)
                })
                }    
            }) 
        }  
        else {
            setUserHaveLocations(false);
        }  
    }, [zipcodes]);

    // Adds a new zipcode to the Backend API locations for user
    // Executes when user clicks user zipcode input button on Header component
    // Verifies zipcode is not already in zipcode state array
    // Executes POST request to Backend API with userid and zipcode
    // Executes GET request for users locations
    // Updates zipcode state array with user's db locations
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

    // Deletes a zipcode from the Backend API locations for user
    // Executes when user clicks delete icon button on WeatherCard component
    // Executes DELETE request to Backend API with locationid
    // Updates zipcode state array
    // Updates weatherData array
    const handleDelete = (locationid) => {
        axiosWithAuth().delete(`locations/location/${locationid}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        setZipcodes(zipcodes.filter(zipObj => zipObj.locationid !== locationid));
        setWeatherData(weatherData.filter(weatherDataObj => weatherDataObj.locationid !== locationid));
    }

    // Resets zipApiErr to initial state when user closes UI Alert
    const handleRemoveError = () => {
        setZipApiErr("");
    }

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
                    // Display animation and prompt if no locations found after initial load
                    !userHaveLocations?
                    <div className="welcomeWrapper">
                        <Paper className={classes.welcome} elevation={10}>
                            <img width="65%" src={animation} alt="weather icon animation"/>
                        <Typography className={classes.textStyle} variant="h5">Add a 5-Digit Zipcode in the Toolbar</Typography>
                        <Typography className={classes.textStyle } variant="h5"> Get Current Weather for any US Location</Typography>
                        </Paper>
                    </div> : 
                    // Display a WeatherCard component for each location
                    <div className={classes.weatherCardWrapper}>
                        {console.log(weatherData)}
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
