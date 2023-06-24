import { VotingContractContext } from "@/providers/VotingContractProvider";

import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "@/components/generic/ColorModeSwitcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useContext } from "react";

export function Navbar() {
    const { isConnected } = useAccount();
    const { isOwner } = useContext(VotingContractContext);
    return (
        <Flex
            direction={"column"}
            w={"100%"}
            position="fixed"
            zIndex="10"
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            boxShadow={useColorModeValue(
                "0 5px 25px rgba(9,17,53,.18823529411764706)",
                "0 5px 20px #f003ba "
            )}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.100", "primary.100")}
            justify={{ base: "space-between", xl: "space-around" }}
        >
            <Flex
                justify={{ base: "space-between", xl: "space-around" }}
                align={"center"}
            >
                {/* HOME LINK */}
                <Link
                    href="/"
                    fontSize={"lg"}
                    _hover={{
                        textDecoration: "none",
                    }}
                    fontWeight="bold"
                >
                    <Heading
                        ml={{ base: "2vh", lg: "5vh", xl: "5vh", "2xl": "5vh" }}
                        as="h1"
                        fontSize={"2xl"}
                    >
                        <Box
                            color={useColorModeValue("blue.600", "orange.300")}
                        >
                            VOTING
                        </Box>{" "}
                        <Box>Alyra</Box>
                    </Heading>
                </Link>

                {/* Wallet Connector & COLOR MODE */}
                <HStack
                    mr={{ base: "1vh", lg: "5vh", xl: "5vh", "2xl": "5vh" }}
                >
                    <ConnectButton
                        label="Connexion"
                        accountStatus={{
                            smallScreen: "avatar",
                            largeScreen: "full",
                        }}
                        chainStatus={{
                            smallScreen: "none",
                            largeScreen: "full",
                        }}
                    />

                    {/* Menu */}
                    {isOwner && (
                        <Menu>
                            <MenuButton variant={"ghost"} as={Button}>
                                Menu
                            </MenuButton>
                            <MenuList>
                                <Link href="/">
                                    <MenuItem>Home</MenuItem>
                                </Link>
                                <Link href="admin">
                                    <MenuItem>Admin Dashboard</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    )}
                    <ColorModeSwitcher />
                </HStack>
            </Flex>
        </Flex>
    );
}
