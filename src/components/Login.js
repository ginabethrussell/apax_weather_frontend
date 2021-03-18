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
};

function Login() {
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
    width: "75%",
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

  const login = (e) => {
    e.preventDefault();
    console.log("logging in user" + credentials);
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
        console.log(res.data);
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
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h1 style={titleStyle}>My Weather App</h1>
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2 style={headingStyle}>Sign In</h2>
        </Grid>
        <form onSubmit={login}>
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
            Sign In
          </Button>

          <Typography style={textStyle}>
            {" "}
            Need an account?
            <Link onClick={() => history.push("/signup")}> Sign Up</Link>
          </Typography>
          {error.length > 0 && (
            <Typography style={errorStyle}>{error}</Typography>
          )}
        </form>
        {isLoading && (
          <div style={loadingStyle}>
            <Typography style={loadingTextStyle}>
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
