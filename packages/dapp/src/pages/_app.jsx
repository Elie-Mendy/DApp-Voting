import { useEffect, useState } from "react";

// Voting Contract Provider
import { VotingContractProvider } from "@/providers/VotingContractProvider";

// Chakra UI provider
import { ChakraProvider } from "@chakra-ui/react";
// layout
import MainLayout from "@/layouts/MainLayout";

// Rainbowkit
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, lightTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from 'wagmi/providers/alchemy';

// Wagmi provider
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia, hardhat, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from '@wagmi/core/providers/infura'

import {
    injectedWallet,
    rainbowWallet,
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
    ledgerWallet,
    argentWallet,
    trustWallet
} from '@rainbow-me/rainbowkit/wallets';

const { NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, NEXT_PUBLIC_INFURA_PROJECT_ID, NEXT_PUBLIC_WALLET_CONNECT_APPNAME } = process.env
const projectId = NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    appName = NEXT_PUBLIC_WALLET_CONNECT_APPNAME

// wagmi config
const { chains, publicClient } = configureChains(
    [mainnet, sepolia, polygon, polygonMumbai, hardhat],
    [
        publicProvider(),
        infuraProvider({ apiKey: NEXT_PUBLIC_INFURA_PROJECT_ID })
    ]
);

const { connectors, wallets } = getDefaultWallets({
    appName,
    projectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    chains,
});

// const connectors = connectorsForWallets([
//     {
//         groupName: 'Recommended',
//         wallets: [
//             injectedWallet({ chains }),
//             rainbowWallet({ projectId, chains }),
//             metaMaskWallet({ projectId, chains }),
//             coinbaseWallet({ chains, appName }),
//             walletConnectWallet({ projectId, chains }),
//         ],
//     },
//     {
//         groupName: 'Others',
//         wallets: [
//             ledgerWallet({ projectId, chains }),
//             argentWallet({ projectId, chains }),
//             trustWallet({ projectId, chains })
//         ],
//     },
// ])

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    projectId,
    publicClient
});

export default function App({ Component, pageProps }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <ChakraProvider>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider
                    chains={chains}
                    theme={{
                        lightMode: lightTheme({
                            accentColor: "#2b6cb0",
                            overlayBlur: "small",
                            borderRadius: "large",
                        }),
                    }}
                >
                    {mounted && (
                        <VotingContractProvider>
                            <Component {...pageProps} />
                        </VotingContractProvider>
                    )}
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    );
}
