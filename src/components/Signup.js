import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import animation from "../cloudy-day-3.svg"

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  LinearProgress,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paperStyle: {
    padding: 20,
    height: "auto",
    minHeight: 550,
    width: "75%",
    minWidth: 260,
    maxWidth: 350,
    margin: "50px auto",
  },
  avatarStyle:
  { backgroundColor: "#57a0ee"
 },
 buttonStyle: { 
   margin: "20px 0" 
  },
  titleStyle: {
    fontWeight: "400",
    color: "#2e3451",
    marginBottom: "10px",
    marginTop: 0
  },
  headingStyle: {
    fontWeight: "400",
    color: "#2e3451",
    marginTop: "10px",
  },
  fieldStyle: { 
    marginBottom: "15px"
  },
  textStyle: { 
    color: "#2e3451"
  },
  errorStyle: { 
    color: "#f44336" 
  },
  loadingStyle: { 
    margin: "25px"
  },
  loadingTextStyle: { 
    marginBottom: "10px", 
    color: "#2e3451" 
  }
}));

const initialUserCredentials = {
  username: "",
  password: "",
  primaryemail: "",
};

function Signup() {
  const [credentials, setCredentials] = useState(initialUserCredentials);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUsername } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const signup = (e) => {
    e.preventDefault();
    const newuser = {
      username: credentials.username.toLowerCase(),
      password: credentials.password,
      primaryemail: credentials.primaryemail,
    };
    setIsLoading(true);
    axios
      .post("https://gbr4477-apax-weather.herokuapp.com/createnewuser", newuser)
      .then((res) => {
        console.log(res.data);
        setError("");
        setUsername(credentials.username);
        setIsLoading(false);
        setCredentials(initialUserCredentials);
        localStorage.setItem("token", res.data.access_token);
        history.push("/welcome");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError("An error has occcurred. Please try again.");
      });
  };

  const handleChange = (e) =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <img width="100px" src={animation} alt="weather animation" />
          <h1 className={classes.titleStyle}>Clear Weather</h1>
          <Avatar className={classes.avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2 className={classes.headingStyle}>Sign Up</h2>
        </Grid>
        <form onSubmit={signup}>
          <TextField
            className={classes.fieldStyle}
            label="Username"
            name="username"
            placeholder="Enter username"
            value={credentials.username}
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            className={classes.fieldStyle}
            label="Email"
            type="email"
            name="primaryemail"
            placeholder="Enter an email"
            value={credentials.primaryemail}
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            placeholder="Enter password"
            type="password"
            value={credentials.password}
            fullWidth
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            className={classes.buttonStyle}
          >
            Sign Up
          </Button>
        </form>
        <Typography className={classes.textStyle}>
          Have an account?
          <Link onClick={() => history.push("/")}> Sign In</Link>
        </Typography>

        {error.length > 0 && (
          <Typography className={classes.errorStyle}>{error}</Typography>
        )}

        {isLoading && (
          <div className={classes.loadingStyle}>
            <Typography className={classes.loadingTextStyle}>
              Signing up user ...
            </Typography>
            <LinearProgress />
          </div>
        )}
      </Paper>
    </Grid>
  );
}

export default Signup;
