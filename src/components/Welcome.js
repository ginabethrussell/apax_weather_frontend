import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import animation from "../cloudy-day-3.svg"
import {
    Paper, 
    Grid,
    Typography,
    Button
} 
from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  welcome: {
    padding: 20,
    height: "auto",
    width: "75%",
    minWidth: 260,
    maxWidth: 400,
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
  buttonStyle: {
      marginTop: 20
  }

}));

function Welcome() {
    const classes = useStyles();
    const { username } = useContext(UserContext);
    const history = useHistory();
    return (
        <Grid 
        className={classes.root}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
            <Paper className={classes.welcome} elevation={10}>
                <Typography className={classes.textStyle} variant="h4">My Weather App</Typography>
                <Typography className={classes.textStyle} variant="h5">Welcome, {username}</Typography>
                <img width="40%" src={animation} alt="weather icon animation"/>
                <Typography className={classes.textStyle} variant="h6">Access current weather anywhere in the USA</Typography>
                <Typography className={classes.textStyle} variant="h6">Enter a 5-digit Zipcode on your Weather Dashboard</Typography>
                <Typography className={classes.textStyle} variant="h6">Add and Delete locations to meet your weather needs</Typography> 
                <Button className={classes.buttonStyle}onClick={()=> history.push("/weather")} color="primary" size="large" variant="contained">Get Started</Button>
            </Paper>  
        </Grid>
    )
}

export default Welcome
