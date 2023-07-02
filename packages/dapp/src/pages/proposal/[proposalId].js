import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import HeaderProposal from '@/components/proposal/HeaderProposal';
import MainLayout from '@/layouts/MainLayout';
import { VotingContractContext } from "@/providers/VotingContractProvider";

export default function ProposalId() {
    const { getOneProposal, isVoter, setVote } = useContext(VotingContractContext)
    const router = useRouter()
    const { proposalId } = router.query
    const [proposal, setProposal] = useState({})

    useEffect(() => {
        if (!isVoter) router.push('/')
    }, [isVoter, router])

    const loadProposal = async () => {
        const p = await getOneProposal(Number(proposalId))
        setProposal(p)
    }

    useEffect(() => {
        if (!proposalId) return
        loadProposal()
    }, [proposalId, setVote, loadProposal])
    
    return (
        <>
            {proposalId && proposal && isVoter && (
                <MainLayout>
                    <Grid py={3} minH={"20vh"}>
                        <HeaderProposal
                            proposalId={proposalId}
                            description={proposal.description}
                            totalVotes={Number(proposal.voteCount).toString()}
                        />
                    </Grid>
                </MainLayout>
            )}
        </>
    )
}