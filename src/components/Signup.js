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

  // Material UI styles
  const paperStyle = {
    padding: 20,
    height: "80vh",
    maxHeight: "600px",
    width: "70%",
    minWidth: 280,
    maxWidth: 350,
    margin: "100px auto",
  };
  const avatarStyle = { backgroundColor: "#44ccee" };
  const buttonStyle = { margin: "20px 0" };
  const titleStyle = {
    fontWeight: "600",
    color: "#2e3451",
    marginBottom: "10px",
  };
  const headingStyle = {
    fontWeight: "400",
    color: "#2e3451",
    marginTop: "10px",
  };
  const fieldStyle = { marginBottom: "15px" };
  const textStyle = { color: "#2e3451" };
  const errorStyle = { color: "crimson" };
  const loadingStyle = { margin: "25px" };
  const loadingTextStyle = { marginBottom: "10px", color: "#2e3451" };

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
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h1 style={titleStyle}>My Weather App</h1>
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2 style={headingStyle}>Sign Up</h2>
        </Grid>
        <form onSubmit={signup}>
          <TextField
            style={fieldStyle}
            label="Username"
            name="username"
            placeholder="Enter username"
            value={credentials.username}
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            style={fieldStyle}
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
            style={buttonStyle}
          >
            Sign Up
          </Button>
        </form>
        <Typography style={textStyle}>
          Have an account?
          <Link onClick={() => history.push("/")}> Sign In</Link>
        </Typography>

        {error.length > 0 && (
          <Typography style={errorStyle}>{error}</Typography>
        )}

        {isLoading && (
          <div style={loadingStyle}>
            <Typography style={loadingTextStyle}>
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
