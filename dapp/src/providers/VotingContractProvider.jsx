import { createContext, useMemo } from "react";
import { useVotingContract } from '@/hooks/useVotingContract';

export const VotingContractContext = createContext();
export const VotingContractAdminContext = createContext();

export const VotingContractAdminProvider = ({ children }) => {
    const {
        // admin functions
        addVoter, startProposalsRegistering, endProposalsRegistering,
        startVotingSession, endVotingSession, tallyVotes,
    } = useVotingContract()

    const values = useMemo(() => ({
        addVoter, startProposalsRegistering, endProposalsRegistering,
        startVotingSession, endVotingSession, tallyVotes,
    }), [
        addVoter, startProposalsRegistering, endProposalsRegistering,
        startVotingSession, endVotingSession, tallyVotes,
    ])

    // Contexts
    return <VotingContractAdminContext.Provider value={values}>{children}</VotingContractAdminContext.Provider>;
};


export const VotingContractProvider = ({ children }) => {
    const {
        // contract state
        address, contract, owner, isOwner, isVoter, hasVoted,
        winningProposalID, workflowStatus,

        // voter
        getVoter, getOneProposal, addProposal, setVote,
        
        // Event
        votersLogs, proposalsLogs, votesLogs, workflowStatusChangeLogs,

        // TableData
        votersTableData, proposalsTableData
    } = useVotingContract()

    const values = useMemo(() => ({
        address, contract, owner, isOwner, isVoter, hasVoted,
        winningProposalID, workflowStatus,
        getVoter, getOneProposal, addProposal, setVote,
        votersLogs, proposalsLogs, votesLogs, workflowStatusChangeLogs,
        votersTableData, proposalsTableData

    }), [
        address, contract, owner, isOwner, isVoter, hasVoted,
        winningProposalID, workflowStatus,
        getVoter, getOneProposal, addProposal, setVote,
        votersLogs, proposalsLogs, votesLogs, workflowStatusChangeLogs,
        votersTableData, proposalsTableData
    ])

    // Contexts
    return <VotingContractContext.Provider value={values}>{children}</VotingContractContext.Provider>;
};
