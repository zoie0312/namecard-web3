import "@rainbow-me/rainbowkit/styles.css";
import {
    ConnectButton,
    getDefaultWallets,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import { Center, VStack } from "@chakra-ui/react";

import Main from "../components/Main";

const { chains, provider } = configureChains(
    [
        chain.mainnet,
        chain.polygon,
        chain.optimism,
        chain.arbitrum,
        chain.goerli,
    ],
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export default function IndexPage() {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <ChakraProvider>
                    <Center p="5">
                        <VStack>
                            <ConnectButton />
                            <Main />
                        </VStack>
                    </Center>
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
