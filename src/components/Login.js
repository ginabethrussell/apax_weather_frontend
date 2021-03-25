import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
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

import animation from "../cloudy-day-3.svg"

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
  titleStyle: {
    fontWeight: "400",
    color: "#2e3451",
    marginBottom: "10px",
    marginTop: 0
  },
  avatarStyle: {
    backgroundColor: "#57a0ee"
  },
  buttonStyle: {
    margin: "20px 0"
  },
  headingStyle: {
    fontWeight: "400",
    color: "#2e3451",
    marginTop: "10px",
  },
  fieldStyle: {
    marginBottom: 15
  },
  textStyle: {
    color: "#2e3451", 
    marginBottom: 10
  }, 
  errorStyle: {
    color: "#f44336" 
  },
  loadingStyle: {
    margin: 25
  },
  loadingTextStyle: {
    marginBottom: 10, 
    color: "#2e3451" 
  }
}))

const initialUserCredentials = {
  username: "",
  password: "",
};

function Login() {
  const [credentials, setCredentials] = useState(initialUserCredentials);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUsername } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "https://gbr4477-apax-weather.herokuapp.com/login",
        `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
        {
          headers: {
            Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        setUsername(credentials.username);
        setError("");
        setCredentials(initialUserCredentials);
        setIsLoading(false);
        history.push("/weather");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError("Invalid username or password");
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
          <h2 className={classes.headingStyle}>Sign In</h2>
        </Grid>
        <form onSubmit={login}>
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
            Sign In
          </Button>

          <Typography className={classes.textStyle}>
            {" "}
            Need an account?
            <Link onClick={() => history.push("/signup")}> Sign Up</Link>
          </Typography>
          {error.length > 0 && (
            <Typography className={classes.errorStyle}>{error}</Typography>
          )}
        </form>
        {isLoading && (
          <div className={classes.loadingStyle}>
            <Typography className={classes.loadingTextStyle}>
              Signing in user ...
            </Typography>
            <LinearProgress />
          </div>
        )}
      </Paper>
    </Grid>
  );
}

export default Login;
