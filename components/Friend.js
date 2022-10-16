import React from "react";
import { Box, AspectRatio } from "@chakra-ui/react";

import useEnsData from "../hooks/useEns.tsx";

export default function Friend({ addr }) {
    const ensData = useEnsData(addr);
    //console.log("friend addr ", addr);
    //console.log("friend ensData ", JSON.stringify(ensData, null, 2));
    const getReturn = (addr) => {
        if (ensData.ensName) {
            return (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    my="4"
                    alignItems="center"
                >
                    <Box>{ensData.ensName}</Box>
                    <AspectRatio
                        w="md"
                        maxW="40px"
                        ratio={1}
                        backgroundImage={ensData.avatarUrl}
                        backgroundPosition="center"
                        backgroundSize="cover"
                        overflow="hidden"
                        borderRadius="100%"
                    >
                        <Box></Box>
                    </AspectRatio>
                </Box>
            );
        } else {
            return <Box>{addr}</Box>;
        }
    };
    return getReturn(addr);
}
