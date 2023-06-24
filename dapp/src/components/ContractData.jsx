import { Card, CardBody, Flex, Stack, Text,useColorModeValue } from "@chakra-ui/react";
import { VotingContractContext } from "@/providers/VotingContractProvider";
import { useContext } from "react";
const ContractData = () => {
    const { address, owner, workflowStatus, winningProposalID } = useContext(
        VotingContractContext
    );

    const themeColor = useColorModeValue("blue.700", "orange.300");
    const themeCardColor = useColorModeValue("#f6f5ff", "gray.700");
    const themeShadow = "0 5px 25px rgba(9,17,53,.18823529411764706)";

    return (
        <Card
            overflow="hidden"
            size="lg"
            bg={themeCardColor}
            boxShadow={themeShadow}
        >
            <CardBody pb={3}>
                <Stack>
                    <Text>Address : {address}</Text>
                    <Text>owner : {owner}</Text>
                    <Text>workflowstatus : {workflowStatus}</Text>
                    <Text>winningProposalID : {winningProposalID}</Text>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default ContractData;
