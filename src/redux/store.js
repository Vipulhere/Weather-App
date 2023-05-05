// Importing necessary modules from Redux and redux-thunk
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// Importing the reducer function from our reducer module
import { reducer } from "./reducer";

// Creating a Redux store by passing the reducer function and the thunk middleware to the createStore function
export const store = createStore(reducer, applyMiddleware(thunk));
