import React, { useContext, useState } from "react";

import { VotingContractAdminContext } from "@/providers/VotingContractProvider";

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useDisclosure,
    Input,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Image,
    Text,
} from "@chakra-ui/react";

function RegistrationModal() {

    const { addVoter } = useContext(VotingContractAdminContext);
    const [voterAddress, setVoterAddress] = useState("")

    const OverlayOne = () => (
        <ModalOverlay
            bg="black.100"
            backdropFilter="blur(10px) hue-rotate(2deg)"
        />
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
    const themeColor = useColorModeValue("blue.700", "orange.300");

    return (
        <>
            <Button
                mt={4}
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }}
            >
                Register a new Voter
            </Button>
            <Modal isOpen={isOpen} size={"2xl"} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader color={themeColor}>New voter</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Voter address</FormLabel>
                            <Input placeholder="0x..." onChange={(e) => setVoterAddress(e.target.value)}/>
                        </FormControl>
                        <Accordion allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="cennter"
                                        >
                                            <Image src="https://plugins.jetbrains.com/files/18551/349727/icon/pluginIcon.svg" alt="hardhat logo"/>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={45}>
                                    <Text color={themeColor}>Account #0:</Text> 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
                                    <Text color={themeColor}>Account #1:</Text> 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
                                    <Text color={themeColor}>Account #2:</Text> 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
                                    <Text color={themeColor}>Account #3:</Text> 0x90F79bf6EB2c4f870365E785982E1f101E93b906
                                    <Text color={themeColor}>Account #4:</Text> 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
                                    <Text color={themeColor}>Account #5:</Text> 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
                                    <Text color={themeColor}>Account #6:</Text> 0x976EA74026E726554dB657fA54763abd0C3a0aa9
                                    <Text color={themeColor}>Account #7:</Text> 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
                                    <Text color={themeColor}>Account #8:</Text> 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
                                    <Text color={themeColor}>Account #9:</Text> 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
                                    <Text color={themeColor}>Account #10:</Text> 0xBcd4042DE499D14e55001CcbB24a551F3b954096
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => addVoter(voterAddress)}>
                            Add Voter
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RegistrationModal;
