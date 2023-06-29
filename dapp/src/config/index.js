import { createPublicClient, http } from "viem";
import { mainnet, sepolia, hardhat } from "viem/chains";
import ABI from "@/config/ABIs.json";

console.log('CONFIG', process.env, ABI, "fss")

export const config = {
    chain: process.env.NEXT_PUBLIC_CLIENT_CHAIN,
    contracts: {
        voting: {
            address: process.env.NEXT_PUBLIC_CHAIN,
            abi: ABI.voting
        }
    }
}

const chain = process.env.NEXT_PUBLIC_CLIENT_CHAIN === "mainnet"
    ? mainnet
    : process.env.NEXT_PUBLIC_CLIENT_CHAIN === "sepolia"
        ? sepolia : hardhat;

export const client = createPublicClient({
    chain: chain,
    transport: http(),
});
