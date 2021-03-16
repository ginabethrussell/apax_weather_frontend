import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";

function Login() {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
    const history = useHistory();
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
		<>
		<h2> Login to Your Account</h2>
		<form onSubmit={login}>
			<label>
				Username:
				<input
					type="text"
					name="username"
					value={credentials.username}
					onChange={handleChange}
				/>
			</label>
			<label>
				password:
				<input
					type="password"
					name="password"
					value={credentials.password}
					onChange={handleChange}
				/>
			</label>
			<br/>
			<button>Log in</button>
		</form>
		</>
	);
};

export default Login;