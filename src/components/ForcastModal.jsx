import { Box, Grid, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { dateFormat } from "../helpers/extraFunctions";
import { NewText } from "./SmallComponents";
import { ImSun } from "react-icons/im";
import { MdOutlineNightsStay } from "react-icons/md";

// Component that displays weather forecast data in a modal
export const ForcastModal = ({ data }) => {

    // Extract date and day from date string using helper function
    const { date, day } = dateFormat(data.dt);

    // State for controlling the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {/* Display weather data with an icon in a clickable box */}
            <Box onClick={onOpen} cursor={'pointer'} mt={'10px'}>
                <Text color={'#008B8B'} fontWeight={500} fontSize={'27px'}>
                    <Icon as={ImSun} /> {Math.round(data.temp.day)}<sup>o</sup> C
                </Text>
                <Text color={'#008B8B'} fontWeight={500} fontSize={'27px'}>
                    <Icon as={MdOutlineNightsStay} /> {Math.round(data.temp.night)}<sup>o</sup> C
                </Text>
                <Text color={'#008B8B'} fontWeight={500} fontSize={'20px'}>
                    {data.weather[0].main}
                </Text>
            </Box>

            {/* Modal that displays weather data */}
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box p={'10px'}>
                            {/* Header with date and day */}
                            <Box p={'5px'} bg={'#008B8B'} textAlign={'center'} borderRadius={'30px'} mb={'20px'} >
                                <Text fontWeight={500} color={'white'} fontSize={'18px'}>{date}</Text>
                                <Text fontWeight={500} color={'white'} fontSize={'18px'}>{day}</Text>
                            </Box>

                            {/* Grid to display weather data */}
                            <Grid templateColumns={'50% 50%'} >
                                {/* Labels */}
                                <Box pb={'10px'} pl={'15%'}>
                                    {['Felt Temp.', 'Humidity', 'Wind', 'Pressure', 'Day Temp.', 'Evening Temp.', 'Night Temp.', 'Max Temp.', 'Min Temp.'].map((e, i) => (
                                        <Text key={i} color={'#008B8B'} fontWeight={500} mt={'15px'} fontSize={'18px'} >{e}</Text>
                                    ))}
                                </Box>
                                {/* Weather data */}
                                <Box borderRadius={'30px'} bg={'#008B8B'} pb={'10px'} pl={'15%'}> 
                                    {/* This Box component contains weather data */}
                                    <NewText>{data.feels_like.day}<sup>o</sup> C</NewText> 
                                    {/* Display the feels like temperature in Celsius */}
                                    <NewText>{data.humidity}%</NewText> 
                                    {/* Display the humidity percentage */}
                                    <NewText>{(data.wind_speed * 3.6).toFixed(2)} Km/h</NewText> 
                                    {/* Convert the wind speed from m/s to km/h and display it */}
                                    <NewText>{data.pressure} hPa</NewText> 
                                    {/* Display the pressure in hPa */}
                                    <NewText>{data.temp.day}<sup>o</sup> C</NewText> 
                                    {/* Display the temperature during the day in Celsius */}
                                    <NewText>{data.temp.eve}<sup>o</sup> C</NewText> 
                                    {/* Display the temperature during the evening in Celsius */}
                                    <NewText>{data.temp.night}<sup>o</sup> C</NewText> 
                                    {/* Display the temperature during the night in Celsius */}
                                    <NewText>{data.temp.min}<sup>o</sup> C</NewText> 
                                    {/* Display the minimum temperature in Celsius */}
                                    <NewText>{data.temp.max}<sup>o</sup> C</NewText> 
                                    {/* Display the maximum temperature in Celsius */}
                                </Box>

                            </Grid>
                        </Box>
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

