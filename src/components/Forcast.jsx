import { Box, Icon, Text } from "@chakra-ui/react";
import { ForcastBox } from "./SmallComponents";
import { ImSun } from "react-icons/im";
import { MdOutlineNightsStay } from "react-icons/md";
import { dateFormat } from "../helpers/extraFunctions";
import { setItem } from "../helpers/sessionStorage";
import { ForcastModal } from "./ForcastModal";

export const Forcast = ({ data }) => {

    // destructure the date and day from the formatted date
    const { date, day } = dateFormat(data.dt);

    return (
        <Box>
            <ForcastBox >

                {/* render the date and day */}
                <Box p={'5px'} bg={'#008B8B'}>
                    <Text fontWeight={500} color={'white'} fontSize={'18px'}>{date}</Text>
                    <Text fontWeight={500} color={'white'} fontSize={'18px'}>{day}</Text>
                </Box>

                {/* render the forecast modal */}
                <ForcastModal data={data} />

            </ForcastBox>
        </Box>
    );
};
