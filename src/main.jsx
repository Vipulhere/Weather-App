// Import necessary modules
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './redux/store'

// Set default base URL for Axios requests
axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";

// Render the app
ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the app with the ChakraProvider for styling */}
    <ChakraProvider>
      {/* Wrap the app with the ReduxProvider for state management */}
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>,
  // Mount the app to the root element in the HTML
  document.getElementById('root')
)
