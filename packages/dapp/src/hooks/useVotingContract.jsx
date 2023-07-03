import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

import {
    getWalletClient,
    getContract,
    prepareWriteContract,
    writeContract,
    readContract,
    watchContractEvent,
} from "@wagmi/core";
import { useAccount, useNetwork } from "wagmi";
import { isAddress, parseAbiItem } from "viem";
import { useNotif } from "@/hooks/useNotif";

import { config, client } from "@/config";
import { confetti } from "@/utils";

export function useVotingContract() {
    const { isConnected, address, activeConnector } = useAccount();
    const { chain } = useNetwork();
    const { setInfo, setError } = useNotif();
    const toast = useToast();

    // init state
    const [contract, setContract] = useState({});
    const [owner, setOwner] = useState(null);
    const [isVoter, setIsVoter] = useState(null);
    const [isOwner, setIsOwner] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [winningProposalID, setWinningProposalID] = useState(null);
    const [workflowStatus, setWorkflowStatus] = useState(null);
    const [proposalsLogs, setProposalsLogs] = useState([]);
    const [votersLogs, setVotersLogs] = useState([]);
    const [votesLogs, setVotesLogs] = useState([]);
    const [workflowStatusChangeLogs, setWorkflowStatusChangeLogs] = useState(
        []
    );

    // TableData
    const [votersTableData, setVotersTableData] = useState([]);
    const [proposalsTableData, setProposalsTableData] = useState([]);

    // Load contract
    const loadContract = useCallback(async () => {
        // get contract with provider connected
        const walletClient = await getWalletClient();
        const voting = getContract({
            address: config.contracts.voting.address,
            abi: config.contracts.voting.abi,
            walletClient,
        });

        const owner = isAddress(await voting.read.owner())
            ? await voting.read.owner()
            : null;
        const winProposalID = await voting.read.winningProposalID();
        const wfStatus = await voting.read.workflowStatus();

        // Set state hook
        setWinningProposalID(winProposalID.toString());
        setWorkflowStatus(wfStatus);
        setContract(voting);
        setOwner(owner);
        setIsOwner(owner === address);
    }, [address]);

    // Admin
    const addVoter = async (_address) => {
        if (!_address) return;
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "addVoter",
                args: [String(_address)],
            });
            const { hash } = await writeContract(request);
            setInfo("Voter added !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const startProposalsRegistering = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "startProposalsRegistering",
            });
            const { hash } = await writeContract(request);
            setInfo("Proposals registering started !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const endProposalsRegistering = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "endProposalsRegistering",
            });
            const { hash } = await writeContract(request);
            setInfo("Proposals registering ended !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const startVotingSession = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "startVotingSession",
            });
            const { hash } = await writeContract(request);
            setInfo("Voting session started !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const endVotingSession = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "endVotingSession",
            });
            const { hash } = await writeContract(request);
            setInfo("Voting session ended !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const tallyVotes = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "tallyVotes",
            });
            const { hash } = await writeContract(request);
            setInfo("Votes tallied !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const getVoter = useCallback(
        async (_address, logError = false) => {
            if (!_address) return;
            try {
                const data = await readContract({
                    address: config.contracts.voting.address,
                    abi: config.contracts.voting.abi,
                    functionName: "getVoter",
                    account: address,
                    args: [String(_address)],
                });
                return data;
            } catch (err) {
                logError && setError(err.message);
            }
        },
        [setError, address]
    );
    const getOneProposal = useCallback(
        async (_id) => {
            if (Number(_id) < 0) return;
            try {
                const data = await readContract({
                    address: config.contracts.voting.address,
                    abi: config.contracts.voting.abi,
                    functionName: "getOneProposal",
                    account: address,
                    args: [Number(_id)],
                });
                return data;
            } catch (err) {
                setError(err.message);
            }
        },
        [setError]
    );
    const addProposal = async (_desc) => {
        if (!_desc) return;
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "addProposal",
                args: [String(_desc)],
            });
            const { hash } = await writeContract(request);
            setInfo("Proposal added !");
            confetti();
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };
    const setVote = async (_id) => {
        if (!_id) return;
        try {
            const { request } = await prepareWriteContract({
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                functionName: "setVote",
                args: [Number(_id)],
            });
            const { hash } = await writeContract(request);
            confetti();
            setInfo("Has Voted !");
            return hash;
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch data
    const fetchData = useCallback(async () => {
        // voters
        try {
            const VoterRegisteredLogs = await client.getLogs({
                address: config.contracts.voting.address,
                event: parseAbiItem(
                    "event VoterRegistered(address voterAddress)"
                ),
                // fromBlock: BigInt(Number(await client.getBlockNumber()) - 15000),
                fromBlock: 0n,
                toBlock: "latest",
            });
            console.log("VoterRegisteredLogs", VoterRegisteredLogs);
            const processedVoters = await Promise.all(
                VoterRegisteredLogs.map(async (log) => {
                    const result = await getVoter(log.args.voterAddress);
                    return { address: log.args.voterAddress, ...result };
                })
            );
            setVotersTableData(
                processedVoters.map((voter) => ({
                    address: voter.address,
                    hasVoted: voter.hasVoted,
                    votedProposalId: voter.votedProposalId.toString(),
                }))
            );
            setVotersLogs(
                VoterRegisteredLogs.map((log) => log.args.voterAddress)
            );

            // current user
            const parsedVoters = processedVoters.filter(
                (voter) => voter.address == address
            );
            console.log("parsedVoters", parsedVoters);
            if (parsedVoters.length > 0) {
                setIsVoter(parsedVoters[0].isRegistered);
                setHasVoted(parsedVoters[0].hasVoted);
            } else {
                setIsVoter(false);
                setHasVoted(false);
            }
        } catch (err) {
            setError(err.message);
        }

        // proposals
        const ProposalsLogs = await client.getLogs({
            address: config.contracts.voting.address,
            event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
            // fromBlock: BigInt(Number(await client.getBlockNumber()) - 15000),
            fromBlock: 0n,
            toBlock: "latest",
        });
        const processedProposals = await Promise.all(
            ProposalsLogs.map(async (log) => {
                const result = await getOneProposal(log.args.proposalId);
                return { id: log.args.proposalId, ...result };
            })
        );
        setProposalsTableData(
            processedProposals.map((proposal) => ({
                id: proposal.id.toString(),
                description: proposal.description,
                voteCount: proposal.voteCount.toString(),
            }))
        );

        // votes
        const VotesLogs = await client.getLogs({
            address: config.contracts.voting.address,
            event: parseAbiItem("event Voted(address voter, uint proposalId)"),
            // fromBlock: BigInt(Number(await client.getBlockNumber()) - 15000),
            fromBlock: 0n,
            toBlock: "latest",
        });
        setVotesLogs(VotesLogs);

        // votes
        const WorkflowStatusChangeLogs = await client.getLogs({
            address: config.contracts.voting.address,
            event: parseAbiItem(
                "event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)"
            ),
            // fromBlock: BigInt(Number(await client.getBlockNumber()) - 15000),
            fromBlock: 0n,
            toBlock: "latest",
        });
        setWorkflowStatusChangeLogs(WorkflowStatusChangeLogs);
    }, [address, getOneProposal, getVoter, setError]);

    const setUpListeners = useCallback(() => {
        // event WorkflowStatusChange
        watchContractEvent(
            {
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                eventName: "WorkflowStatusChange",
            },
            (log) => {
                loadContract();
            }
        );

        // event VoterRegistered
        watchContractEvent(
            {
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                eventName: "VoterRegistered",
            },
            (log) => {
                fetchData();
            }
        );

        // event ProposalRegistered
        watchContractEvent(
            {
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                eventName: "ProposalRegistered",
            },
            (log) => {
                fetchData();
            }
        );

        // event Voted
        watchContractEvent(
            {
                address: config.contracts.voting.address,
                abi: config.contracts.voting.abi,
                eventName: "Voted",
            },
            (log) => {
                fetchData();
            }
        );
    }, [fetchData, loadContract]);

    useEffect(() => {
        if (!isConnected) return;
        try {
            loadContract();
            fetchData();
            setUpListeners();
        } catch (error) {
            toast({
                title: "Error Contract !",
                description: "Impossible de trouver le contract.",
                status: "error",
                duration: 9000,
                position: "top-right",
                isClosable: true,
            });
        }
    }, [
        isConnected,
        address,
        chain?.id,
        fetchData,
        loadContract,
        setUpListeners,
        toast,
    ]);
    // export from hook
    return {
        // Static
        address: config.contracts.voting.address,
        // State contract
        contract,
        owner,
        isOwner,
        isVoter,
        hasVoted,
        winningProposalID,
        workflowStatus,
        // Fn
        // admin
        addVoter,
        startProposalsRegistering,
        endProposalsRegistering,
        startVotingSession,
        endVotingSession,
        tallyVotes,
        // voter
        getVoter,
        getOneProposal,
        addProposal,
        setVote,
        // Event
        votersLogs,
        proposalsLogs,
        votesLogs,
        workflowStatusChangeLogs,
        // Data
        votersTableData,
        proposalsTableData,
    };
}
