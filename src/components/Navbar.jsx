import { Button, Center, Flex, Icon, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWeatherByCity, getWeatherByLocation } from "../redux/actions";
import { HiLocationMarker } from "react-icons/hi";

export const Navbar = () => {

    // State to store user input of city name
    const [city, setCity] = useState("");
    
    // Redux dispatch hook to dispatch actions to the store
    const dispatch = useDispatch();
    
    // Chakra UI toast hook for displaying toast messages
    const toast = useToast();

    // Function to handle city name input change
    const handleChnage = () => {
        dispatch(getWeatherByCity(city, toast)); // Dispatch action to fetch weather data by city name
    }

    // Function to handle fetching weather data for user's location
    const handleLocationData = () => {
        dispatch(getWeatherByLocation(toast)); // Dispatch action to fetch weather data by user's location
    }

    return (
        <Flex p={'10px'} minH={'70px'} bg={'#d7defa'} justifyContent={'center'} flexDirection={['column', 'row']} gap={['10px', '0px']}>
            {/* Input component to accept city name input */}
            <Center px={'10px'}>
                <Input
                    onKeyPress={({ key }) => { key === "Enter" ? handleChnage() : undefined }}
                    onInput={(e) => { setCity(e.target.value) }}
                    value={city}
                    borderRadius={'15px 0px 0px 15px'}
                    bg={'white'}
                    _focus={{ 'border': 'none' }}
                    placeholder="City"
                />
                {/* Button component to trigger search by city name */}
                <Button
                    onClick={handleChnage}
                    borderRadius={'0px 15px 15px 0px'}
                    color={'white'}
                    bg={'#008B8B'}
                    _hover={{ 'bg': '#008B8B' }}
                >
                    Search
                </Button>
            </Center>
            {/* Button component to trigger search by user's location */}
            <Center px={'10px'}>
                <Button
                    bg={'#008B8B'}
                    _hover={{ 'bg': '#008B8B' }}
                    color={'white'}
                    w={'100%'}
                    borderRadius={'15px'}
                    leftIcon={<Icon w={'30px'} h={'30px'} as={HiLocationMarker} />}
                    onClick={handleLocationData}
                >
                    Your Location Weather
                </Button>
            </Center>
        </Flex >
    );
};
