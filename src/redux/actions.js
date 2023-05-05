import axios from "axios";
import { weatherAppAPI } from "../helpers/API";
import { myToast } from "../helpers/extraFunctions";
import { setItem } from "../helpers/sessionStorage";
import { GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS } from "./actionTypes";

// Action Creator - Dispatched to indicate that data fetching is started
export const getDataLoading = () => {
    return { type: GET_DATA_LOADING };
}

// Action Creator - Dispatched after successfully fetching data
export const getDataSuccess = (payload) => {
    return { type: GET_DATA_SUCCESS, payload };
}

// Action Creator - Dispatched after an error occurred while fetching data
export const getDataError = () => {
    return { type: GET_DATA_ERROR };
}

// Action Creator - Fetches weather data by using geolocation
export const getWeatherByLocation = (toast) => (dispatch) => {

    // Success callback for getCurrentPosition method
    const success = async (position) => {
        try {
            let { latitude, longitude } = position.coords;
            dispatch(getDataLoading());
            let weatherData = await axios.get(`/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`);
            weatherData = weatherData.data;
            let forcastData = await axios.get(`/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`);
            forcastData = forcastData.data.daily;
            let payload = { weatherData, forcastData }
            dispatch(getDataSuccess(payload));
            setItem("weather", payload);
            myToast(toast, "Your location weather updated", "success")
        } catch (err) {
            console.log(err);
            dispatch(getDataError());
        }
    }

    // Error callback for getCurrentPosition method
    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        myToast(toast, "Please turn on your location", "error")
    }

    // getCurrentPosition method to retrieve the user's current position
    navigator.geolocation.getCurrentPosition(success, error);
}

// Action Creator - Fetches weather data by city name
export const getWeatherByCity = (city, toast) => async (dispatch) => {
    try {
        dispatch(getDataLoading());
        let weatherData = await axios.get(`/weather?q=${city}&appid=${weatherAppAPI}`);
        weatherData = weatherData.data;
        let { lon, lat } = weatherData.coord;
        let forcastData = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`);
        forcastData = forcastData.data.daily;
        let payload = { weatherData, forcastData };
        dispatch(getDataSuccess(payload));
        setItem("weather", payload);
        myToast(toast, "City weather data updated", "success");

    } catch (err) {
        console.log(err);
        dispatch(getDataError());
        myToast(toast, "City weather data doesn't exist", "error");
    }
}

// Action Creator - Synchronizes weather data with the latest data by using city name
export const syncData = (city, toast) => async (dispatch) => {
    try {
        // Get the weather data for the specified city
        let weatherData = await axios.get(`/weather?q=${city}&appid=${weatherAppAPI}`);
        weatherData = weatherData.data;

        // Get the forecast data for the specified city
        let { lon, lat } = weatherData.coord;
        let forcastData = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`);
        forcastData = forcastData.data.daily;

        // Create a payload with the weather and forecast data
        let payload = { weatherData, forcastData };

        // Dispatch the success action with the payload
        dispatch(getDataSuccess(payload));

        // Save the payload to sessionStorage
        setItem("weather", payload);

        // Show a toast message to indicate successful sync
        myToast(toast, "Data sync successfully", "success");
    } catch (err) {
        console.log(err);

        // Dispatch the error action if there was an error fetching the data
        dispatch(getDataError());

        // Show a toast message to indicate that the city weather data doesn't exist
        myToast(toast, "City weather data doesn't exist", "error");
    }
}
