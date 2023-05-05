// Function to convert temperature from Kelvin to Celsius
export const celsius = (x) => (x - 273).toFixed(2);

// Function to display a toast notification
export const myToast = (toast, title, status, description) => toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
});

// Function to format a Unix timestamp into a date and day of the week
export const dateFormat = (dt) => {

    const milliseconds = dt * 1000;

    let myDate = new Date(milliseconds);

    // Get the date in the format dd/mm/yyyy
    let date = myDate.toLocaleString('en-GB').split(",")[0];

    // Get the day of the week in the full format (e.g. Monday, Tuesday, etc.)
    let day = myDate.toLocaleString("en-US", { weekday: "long" });

    return { date, day };
}
