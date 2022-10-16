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
import Friends from "./Friends";

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

    const convertColor = (clr) => {
        if (clr) {
            return `rgb(${clr._rgb[0]},${clr._rgb[1]},${clr._rgb[2]})`;
        } else {
            return "";
        }
    };

    const getBrightness = (clr) => {
        if (clr) {
            return (
                clr._rgb[0] * 0.299 + clr._rgb[1] * 0.587 + clr._rgb[2] * 0.114
            );
        } else {
            return 0;
        }
    };
    const sortColors = (colors) => {
        if (!colors) return [];
        let clrs = colors
            .map((clr) => ({ clr, brightness: getBrightness(clr) }))
            .sort((a, b) => {
                return a.brightness - b.brightness;
            })
            .map(({ clr }) => clr);
        return clrs;
    };

    return (
        <VStack>
            <Heading
                my={4}
                color={
                    sortedColors[0] ? convertColor(sortedColors[0]) : "gray.200"
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
                    zzzzz.eth
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
            <Show above="md">
                <Box mt="5">
                    <NFTCard ethAddress={ensData.ethAddress || ""}></NFTCard>
                </Box>
            </Show>
            <Box display="flex" alignItems="stretch">
                <Card
                    cardData={ensData}
                    colors={sortedColors}
                    cardBgColor={convertColor(sortedColors[0])}
                ></Card>
                <Friends />
            </Box>

            <Show below="md">
                <NFTCard ethAddress={ensData.ethAddress || ""}></NFTCard>
            </Show>
            <Center
                w="100%"
                py="2"
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
            </Center>
        </VStack>
    );
}
