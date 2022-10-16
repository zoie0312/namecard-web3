import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import {
    useContractRead,
    useAccount,
    usePrepareContractWrite,
    useContractEvent,
} from "wagmi";

import { FriendsABI, FriendsContractAddress } from "../abi/Friends";
import Friend from "./Friend";

export default function Friends() {
    const { address } = useAccount();
    //console.log("address ", address);
    const { data: myFriends, refetch } = useContractRead({
        addressOrName: FriendsContractAddress,
        contractInterface: FriendsABI,
        functionName: "showMyFriends",
        staleTime: 1000,
        args: [address],
    });
    console.log("friends ", myFriends);
    return (
        <Box flexDirection="column" m="10">
            <Heading mb="2">My Friends,</Heading>

            {myFriends &&
                myFriends.map((friendAddr) => (
                    <Friend key={friendAddr} addr={friendAddr} />
                ))}
        </Box>
    );
}
