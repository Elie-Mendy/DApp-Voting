import { VotingContractContext } from "@/providers/VotingContractProvider";

import {
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdOutlineHowToVote } from "react-icons/md";
import { BiMedal } from "react-icons/bi";

const TableProposals = () => {
    const {
        proposalsTableData,
        workflowStatus,
        setVote,
        hasVoted,
        winningProposalID,
    } = useContext(VotingContractContext);

    const themeColor = useColorModeValue("blue.700", "orange.300");
    const popoverBgColor = useColorModeValue("red.400", "orange.300");
    const popoverColor = useColorModeValue("white", "gray.800");
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th color={themeColor}>id</Th>
                    <Th color={themeColor}>description</Th>
                    <Th isNumeric color={themeColor}>
                        vote count
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {proposalsTableData &&
                    proposalsTableData.map((proposal) => (
                        <Tr>
                            <Td>
                                {proposal.id}{" "}
                                {winningProposalID === proposal.id && (
                                    <Icon
                                        as={BiMedal}
                                        w={6}
                                        h={6}
                                        color="yellow.500"
                                    />
                                )}
                            </Td>
                            <Td>{proposal.description}</Td>
                            <Td isNumeric>{proposal.voteCount}</Td>
                            {workflowStatus &&
                                workflowStatus.toString() === "3" && (
                                    <Flex p={3}>
                                        {hasVoted ? (
                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        colorScheme="gray"
                                                        color="gray.500"
                                                        w={7}
                                                        h={7}
                                                        icon={
                                                            <MdOutlineHowToVote />
                                                        }
                                                        aria-label="Edit"
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    color={popoverColor}
                                                    bg={popoverBgColor}
                                                >
                                                    <PopoverArrow
                                                        color={popoverColor}
                                                        bg={popoverBgColor}
                                                    />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>
                                                        You have already voted !
                                                    </PopoverHeader>
                                                </PopoverContent>
                                            </Popover>
                                        ) : (
                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        colorScheme="blue"
                                                        w={7}
                                                        h={7}
                                                        icon={
                                                            <MdOutlineHowToVote />
                                                        }
                                                        aria-label="Edit"
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>
                                                        Confirmation!
                                                    </PopoverHeader>
                                                    <PopoverBody>
                                                        <Text>
                                                            Are you sure you
                                                            want to vote for
                                                            that proposal ?
                                                        </Text>
                                                        <HStack
                                                            mt={3}
                                                            justify={
                                                                "space-evenly"
                                                            }
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    setVote(
                                                                        proposal.id
                                                                    )
                                                                }
                                                            >
                                                                Confirm
                                                            </Button>
                                                        </HStack>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    </Flex>
                                )}
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default TableProposals;
