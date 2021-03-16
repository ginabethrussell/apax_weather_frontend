import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

import axios from 'axios';

function Signup() {
    const [credentials, setCredentials] = useState({ username: "", password: "", primaryemail: "" });
    const history = useHistory();

    const signup = (e) => {
        e.preventDefault();
        const newuser = {
            username: credentials.username.toLowerCase(),
            password: credentials.password,
            primaryemail: credentials.primaryemail
        }
        axios
            .post(
                "https://gbr4477-apax-weather.herokuapp.com/createnewuser", newuser)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("token", res.data.access_token);
                history.push("/weather");
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) =>
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
    });

    return (
        <>
        <h2> Signup for an Account to Get Started</h2>
        <form onSubmit={signup}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                email:
                <input
                    type="email"
                    name="primaryemail"
                    value={credentials.primaryemail}
                    onChange={handleChange}
                    required
                />
            </label>
            <br/>
            <label>
                password:
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <br/>
            <button>Submit</button>
        </form>
        </>
    );
   
}

export default Signup
