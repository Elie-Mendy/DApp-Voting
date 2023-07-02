import React, { useContext, useState } from "react";

import { VotingContractContext } from "@/providers/VotingContractProvider";

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Lorem,
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
} from "@chakra-ui/react";

function ProposalModal() {
    const OverlayOne = () => (
        <ModalOverlay
            bg="black.100"
            backdropFilter="blur(10px) hue-rotate(2deg)"
        />
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
    const themeColor = useColorModeValue("blue.700", "orange.300");
    const { addProposal } = useContext(VotingContractContext);
    const [proposalDescription, setProposalDescription] = React.useState("");

    return (
        <>
            <Button
                mt={4}
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }}
            >
                Submit new proposal
            </Button>
            <Modal isOpen={isOpen} size={"2xl"} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader color={themeColor}>New proposal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Proposal description</FormLabel>
                            <Input
                                placeholder="proposal desctiption"
                                required
                                onChange={(e) =>
                                    setProposalDescription(e.target.value)
                                }
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => addProposal(proposalDescription)}>
                            Submit new proposal Voter
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

export default ProposalModal;
