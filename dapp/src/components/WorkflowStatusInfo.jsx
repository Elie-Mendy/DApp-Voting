import { VotingContractContext } from "@/providers/VotingContractProvider";
import {
    Card,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import ProposalModal from "./ProposalModal";

const WorkflowStatusInfo = () => {
    const themeColor = useColorModeValue("blue.700", "orange.300");
    const { workflowStatus, winningProposalID } = useContext(
        VotingContractContext
    );
    const [actionPannel, setActionPannel] = useState(<></>);
    const [infoCard, setInfoCard] = useState(<></>);
    const [workflowStatusText, setWorkflowStatusText] = useState("");

    const setUpWorkflowStatusInfo = async () => {
        switch (workflowStatus) {
            case 0:
                setWorkflowStatusText("Voter Registration");
                setInfoCard(
                    <Card overflow="hidden" size="lg" p={4} mt={2}>
                        <Stack>
                            <Text>
                                The Owner has not started the proposal
                                registration session. You'll be notified when
                                the session is open.
                            </Text>
                        </Stack>
                    </Card>
                );
                break;
            case 1:
                setWorkflowStatusText("Proposal Registration Started");
                setActionPannel(
                    <>
                        <ProposalModal />
                    </>
                );
                setInfoCard(
                    <Card overflow="hidden" size="lg" p={4} mt={2}>
                        <Stack>
                            <Text>
                                The Owner Started the registration proposal
                                session. You can now submit proposals that will
                                be voted by other organisation's members.
                            </Text>
                            <Text>
                                Remember that the data will remains on the
                                blockchain. Then we ask you to stay respectful
                            </Text>
                        </Stack>
                    </Card>
                );
                break;
            case 2:
                setWorkflowStatusText("Proposal Registration Ended");
                setInfoCard(
                    <Card overflow="hidden" size="lg" p={4} mt={2}>
                        <Stack>
                            <Text>
                                The Owner has stopped the proposal registration
                                session.
                            </Text>
                            <Text>
                                For the moment you can observe the submited
                                proposals.
                            </Text>
                            <Text>
                                At the moment the voting session is open, You'll
                                be able to vote for the one you prefer. You'll
                                be notified when the voting session is open.
                            </Text>
                        </Stack>
                    </Card>
                );
                break;
            case 3:
                setWorkflowStatusText("Voting Session Started");
                setInfoCard(
                    <Card overflow="hidden" size="lg" p={4} mt={2}>
                        <Stack>
                            <Text>
                                The Owner has started the voting session. Take
                                the time to read all proposals before to vote.
                                For voting on a proposal, click on the blue
                                button on the right.
                            </Text>
                        </Stack>
                    </Card>
                );
                break;
            case 4:
                setWorkflowStatusText("Voting Session Ended");
                setInfoCard(
                    <Card overflow="hidden" size="lg" p={4} mt={2}>
                        <Stack>
                            <Text>
                                The Owner has stopped the voting session. The
                                winning proposal will be reveald soon.
                            </Text>
                        </Stack>
                    </Card>
                );
                break;
            case 5:
                setWorkflowStatusText("Votes Tallied !");
                setInfoCard(
                    <Card overflow="hidden" size="lg" p={4} mt={2}>
                        <Stack>
                            <Text>
                                The Owner has tallied votes. The winning
                                proposal is the {winningProposalID}.
                            </Text>
                        </Stack>
                    </Card>
                );
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setUpWorkflowStatusInfo();
    }, [workflowStatus]);

    return (
        <Stack w={{base: "100%", lg:"25%"}}>
            <Heading color={themeColor}>{workflowStatusText}</Heading>
            {actionPannel}
            {infoCard}
        </Stack>
    );
};

export default WorkflowStatusInfo;
