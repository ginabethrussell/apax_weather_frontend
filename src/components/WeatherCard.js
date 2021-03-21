import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


const useStyles = makeStyles(() => ({
    avatar: {
      backgroundColor: "#48d0f2",
      height: 75,
      width: 75,
      border: "1px solid #2e3451"
    },
    location: {
        fontFamily: "Noto sans",
        fontSize: 16,
        fontWeight:600
    }
  }));

export default function WeatherCard(props) {
  const { location, handleDelete } = props;
  const classes = useStyles();

  return (
    <Card elevation={10}>
        <CardHeader 
        avatar={
            <Avatar aria-label="current weather image" className={classes.avatar}>
              <img src={`http://openweathermap.org/img/wn/${location.weatherIcon}@2x.png`} alt="weather icon"/>
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(location.locationid)} aria-label="delete location">
              <DeleteForeverIcon />
            </IconButton>
          }
          title={location.name}
          subheader={location.zipcode}
        />
  
      <CardContent>
        <Typography  className={classes.location} gutterBottom>
          Today's Weather - {location.weatherMain}
        </Typography>
        <hr />
        <Typography>
          Current Temperature: {Math.round(location.temp)} °F
          <br/>
          Feels Like: {Math.round(location.feelsLike)} °F
        </Typography>
        <Typography>
          Max Temperature: {Math.round(location.tempMax)} °F
        </Typography>
        <Typography>
          Min Temperature: {Math.round(location.tempMin)} °F
        </Typography>
        <Typography>
          Wind Speed: {Math.round(location.windSpeed)} mph
        </Typography>
      </CardContent>
    </Card>
  );
}
