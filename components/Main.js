import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    VStack,
    Input,
    Link,
    Text,
    Show,
    Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Card from "./Card.tsx";
import NFTCard from "./NFTCard.tsx";
import useEnsData from "../hooks/useEns.tsx";
import useImgColor from "../hooks/useImgColor.tsx";

export default function Main() {
    const { query } = useRouter();
    const [queryAccount, setQueryAccount] = useState(query?.account || "");
    const [domainName, setDomainName] = useState(queryAccount || "");
    const [finalDomainName, setFinalDomainName] = useState(
        queryAccount || domainName
    );
    const [currentAddr, setCurrentAddr] = useState(undefined);
    const ensData = useEnsData(currentAddr, finalDomainName);

    const imgColor = useImgColor(ensData.avatarUrl || "");
    const [sortedColors, setSortedColors] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        // console.log(ensData.ensName);
        setIsFetching(!(ensData.ensName == finalDomainName));
    }, [ensData, finalDomainName]);

    useEffect(() => {
        setDomainName(ensData.ensName || "");
        setFinalDomainName(ensData.ensName || "");
    }, [ensData, currentAddr]);

    useEffect(() => {
        setSortedColors(sortColors(imgColor));
    }, [imgColor]);

    const setQuery = () => {
        setFinalDomainName(domainName);
    };

    return (
        <VStack>
            <Heading
                my={8}
                color={
                    sortedColors[0] ? convertColor(sortedColors[0]) : "gray.100"
                }
            >
                A Web3 Namecard
            </Heading>
            <Input
                borderColor={
                    sortedColors[0] ? convertColor(sortedColors[0]) : "gray.100"
                }
                mt="5"
                value={domainName}
                placeholder="Enter your ens domain name or your Ethereum address"
                onChange={(e) => {
                    if (e.target.value.toString().startsWith("0x")) {
                        setDomainName(e.target.value);
                        setCurrentAddr(e.target.value);
                    } else {
                        setDomainName(e.target.value);
                    }
                }}
            ></Input>
            <HStack spacing="5" mt={2}>
                <Text>Example: </Text>
                <Link
                    onClick={() => {
                        setDomainName("cheyuwu.eth");
                        setFinalDomainName("cheyuwu.eth");
                    }}
                >
                    cheyuwu.eth
                </Link>
                <Link
                    onClick={() => {
                        setDomainName("tinaaaaalee.eth");
                        setFinalDomainName("tinaaaaalee.eth");
                    }}
                >
                    tinaaaaalee.eth
                </Link>
            </HStack>
            <Button
                mt="2"
                backgroundColor={
                    sortedColors[0] ? convertColor(sortedColors[0]) : "gray.100"
                }
                color="white"
                w="100%"
                onClick={setQuery}
            >
                {" "}
                Fetch
                {isFetching && <Spinner ml={3} size="sm" color="white" />}
            </Button>
            <Card
                cardData={ensData}
                colors={sortedColors}
                cardBgColor={convertColor(sortedColors[0])}
            ></Card>

            <Show below="md">
                <NFTCard ethAddress={ensData.ethAddress || ""}></NFTCard>
            </Show>
            <Center
                w="100%"
                py="4"
                padding="3"
                pos={{ base: "initial", md: "absolute" }}
                style={{ bottom: 0 }}
                flexDirection="column"
            >
                <Text mb={1} textAlign="center" fontSize="sm">
                    Set your ENS records at{" "}
                    <Link
                        href="https://app.ens.domains"
                        textDecoration="underline"
                    >
                        app.ens.domains
                    </Link>{" "}
                    to show on this namecard.
                </Text>
                <Text textAlign="center" fontSize="sm">
                    This Demo is made by{" "}
                    <Link
                        isExternal
                        href="https://www.facebook.com/cheyuwu345"
                        textDecoration="underline"
                    >
                        Che-Yu Wu
                    </Link>{" "}
                    and{" "}
                    <Link
                        isExternal
                        href="https://www.facebook.com/lee.ting.ting.tina"
                        textDecoration="underline"
                    >
                        Ting-Ting Lee
                    </Link>
                    .
                </Text>
            </Center>
        </VStack>
    );
}
