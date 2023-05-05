import { googleMapAPI } from "../helpers/API";

// Component that renders an embedded Google Maps view of the specified city
// The city is passed in as a prop
export const Map = ({ city }) => {

    return (
        <div>
            <iframe
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${googleMapAPI}&q=${city}`}>
            </iframe>
        </div>
    );
};