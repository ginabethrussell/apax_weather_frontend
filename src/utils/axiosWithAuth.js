import axios from "axios";

export const axiosWithAuth = () => {
	const token = window.localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: `Bearer ${token}`,
		},
		baseURL: "https://gbr4477-apax-weather.herokuapp.com/",
	});
};