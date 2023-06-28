import { VotingContractContext } from "@/providers/VotingContractProvider";

import {
    Icon,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdCheckCircle } from "react-icons/md";
import { CiTimer } from "react-icons/ci";

const TableVoters = () => {
    const { votersTableData } = useContext(VotingContractContext);
    const themeColor = useColorModeValue("blue.700", "orange.300");
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th color={themeColor}>address</Th>
                    <Th color={themeColor}>has Voted</Th>
                    <Th isNumeric color={themeColor}>
                        voted proposal id
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {votersTableData &&
                    votersTableData.map((voter, idx) => (
                        <Tr key={idx}>
                            <Td>{voter.address}</Td>
                            <Td>
                                {voter.hasVoted ? (
                                    <Icon
                                        as={MdCheckCircle}
                                        w={6}
                                        h={6}
                                        color="green.500"
                                    />
                                ) : (
                                    <Icon
                                        as={CiTimer}
                                        w={6}
                                        h={6}
                                        color="gray.500"
                                    />
                                )}
                            </Td>
                            <Td isNumeric>{voter.votedProposalId}</Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default TableVoters;
