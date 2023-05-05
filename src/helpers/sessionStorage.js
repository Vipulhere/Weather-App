export const getItem = (key) => {
    // Check if the key exists in the session storage
    if (sessionStorage.getItem(key)) {
        // If it exists, return the parsed JSON data
        return JSON.parse(sessionStorage.getItem(key));
    } else {
        // If it doesn't exist, return undefined
        return undefined;
    }
};

export const setItem = (key, data) => {
    // Set the key-value pair in the session storage as a JSON string
    return sessionStorage.setItem(key, JSON.stringify(data));
};
