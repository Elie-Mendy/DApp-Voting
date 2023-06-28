import {
    VotingContractAdminContext,
    VotingContractContext,
} from "@/providers/VotingContractProvider";
import {
    Button,
    Flex,
    Heading,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import ContractData from "@/components/ContractData";
import RegistrationModal from "@/components/admin/RegistrationModal";

const AdminDashboard = () => {
    const themeColor = useColorModeValue("blue.700", "orange.300");
    const [workflowStatusText, setWorkflowStatusText] = useState("");
    const [actionPannel, setActionPannel] = useState(<></>);
    const { workflowStatus } = useContext(VotingContractContext);
    const {
        startProposalsRegistering,
        endProposalsRegistering,
        startVotingSession,
        endVotingSession,
        tallyVotes,
    } = useContext(VotingContractAdminContext);

    const setUpWorkflowStatusFeatures = useCallback(async () => {
        switch (workflowStatus) {
            case 0:
                setWorkflowStatusText("Voter Registration");
                setActionPannel(
                    <>
                        <RegistrationModal />
                        <Button onClick={startProposalsRegistering}>
                            Start Proposal Registration
                        </Button>
                    </>
                );
                break;
            case 1:
                setWorkflowStatusText("Proposal Registration Started");
                setActionPannel(
                    <Button onClick={endProposalsRegistering}>
                        Stop Proposal Registration
                    </Button>
                );
                break;
            case 2:
                setWorkflowStatusText("Proposal Registration Ended");
                setActionPannel(
                    <Button onClick={startVotingSession}>
                        Start Voting Session
                    </Button>
                );
                break;
            case 3:
                setWorkflowStatusText("Voting Session Started");
                setActionPannel(
                    <Button onClick={endVotingSession}>
                        Stop Voting Session
                    </Button>
                );
                break;
            case 4:
                setWorkflowStatusText("Voting Session Ended");
                setActionPannel(
                    <Button onClick={tallyVotes}>Tally Votes</Button>
                );
                break;
            case 5:
                setWorkflowStatusText("Votes Tallied !");
                setActionPannel(<></>);
                break;
            default:
                break;
        }
    }, [
        endProposalsRegistering,
        endVotingSession,
        startProposalsRegistering,
        startVotingSession,
        tallyVotes,
        workflowStatus,
    ]);

    useEffect(() => {
        setUpWorkflowStatusFeatures();
    }, [setUpWorkflowStatusFeatures]);

    return (
        <>
            <Flex
                ml={{ base: "1vh", lg: "5vh", xl: "10vh", "2xl": "15vh" }}
                mr={{ base: "1vh", lg: "5vh", xl: "10vh", "2xl": "15vh" }}
                gap={10}
                flexDirection={{ base: "column", md: "row" }}
                align={"stretch"}
                justify={"space-evenly"}
            >
                <ContractData />

                <Stack>
                    <Heading color={themeColor}>{workflowStatusText}</Heading>

                    {actionPannel}
                </Stack>
            </Flex>
        </>
    );
};

export default AdminDashboard;
