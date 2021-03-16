import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";
import {Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link} from '@material-ui/core';
import LockIcon from "@material-ui/icons/Lock";


function Login() {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
  const history = useHistory();

  // Material UI styles
  const paperStyle={ padding: 20, height: '70vh', width: 280, margin: "100px auto" };
  const avatarStyle={ backgroundColor:'#44ccee' }
  const buttonStyle={ margin: '20px 0'}
  const titleStyle={ fontFamily: 'Open sans',color: '#2e3451', marginBottom: '10px'}
  const headingStyle={ fontFamily: 'Open sans', color: '#2e3451', marginTop: '10px'}
  const fieldStyle={marginBottom: '15px'}
	const login = (e) => {
		e.preventDefault();
		axios
			.post(
				"https://gbr4477-apax-weather.herokuapp.com/login",
				`grant_type=password&username=${credentials.username}&password=${credentials.password}`,
				{
					headers: {
						Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("token", res.data.access_token);
				history.push("/weather");
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
        <Grid align='center'>
          <h1 style={titleStyle}>My Weather App</h1>
          <Avatar style={avatarStyle}><LockIcon/></Avatar>
          <h2 style={headingStyle}>Sign In</h2>
        </Grid>
        <TextField 
          style={fieldStyle}
          label="Username"
          name='username'
          placeholder="Enter username"
          value={credentials.username}
          fullWidth
          required 
          onChange={handleChange}/>
        <TextField 
          label="Password"
          name='password'
          placeholder="Enter password"
          type='password'
          value={credentials.password}
          fullWidth
          required 
          onChange={handleChange}/>
        
        <Button type='submit' color='primary' variant='contained' fullWidth style={buttonStyle} >Sign In</Button>
        
        <Typography> Need an account?
          <Link href="#" > Sign Up</Link>
        </Typography>
        </Paper>
      </Grid>
	);
};

export default Login;