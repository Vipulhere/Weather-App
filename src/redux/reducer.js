// Importing the `getItem` function from the `sessionStorage` helper and the action types
import { getItem } from "../helpers/sessionStorage";
import { GET_DATA_ERROR, GET_DATA_LOADING, GET_DATA_SUCCESS } from "./actionTypes";

// Initializing the state object with initial values
const initState = {
  isLoading: getItem("weather") ? false : true, // Setting `isLoading` to `false` if `weather` data is already present in the session storage, otherwise `true`
  weatherData: getItem("weather") ? getItem("weather").weatherData : {}, // Setting `weatherData` to the value stored in the `weather` key in the session storage, otherwise an empty object
  forcastData: getItem("weather") ? getItem("weather").forcastData : [], // Setting `forcastData` to the value stored in the `weather` key in the session storage, otherwise an empty array
  isError: false // Setting `isError` to `false` initially
}

// Defining the reducer function which takes the current state and the action object as input and returns a new state
export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_DATA_LOADING:
      return {
        ...state, // Keeping the previous state values
        isLoading: true, // Setting `isLoading` to `true`
        isError: false // Setting `isError` to `false`
      };
    case GET_DATA_SUCCESS:
      return {
        ...state, // Keeping the previous state values
        isLoading: false, // Setting `isLoading` to `false`
        isError: false, // Setting `isError` to `false`
        weatherData: payload.weatherData, // Setting `weatherData` to the value received in the payload object
        forcastData: payload.forcastData // Setting `forcastData` to the value received in the payload object
      };
    case GET_DATA_ERROR:
      return {
        ...state, // Keeping the previous state values
        isLoading: false, // Setting `isLoading` to `false`
        isError: true // Setting `isError` to `true`
      };
    default:
      return state; // Returning the current state if the action type doesn't match any of the cases
  }
}
