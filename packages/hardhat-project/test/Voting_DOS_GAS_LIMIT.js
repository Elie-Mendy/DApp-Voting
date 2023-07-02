const {
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Voting with DOS GAS LIMIT on proposals", function () {
    const total_proposals = 5000
    this.timeout(5 * (60 * 1000))

    /**
     * Fixture
     * ******* */
    async function deployContextRegisterVoter() {
        // Déploiement du contrat
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        await voting.deployed();

        // Get provider with signer
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();

        return { voting, owner, addr1, addr2, addr3 };
    };

    async function deployContextProposal() {
        // Call child fixture 
        const { voting, owner, addr1, addr2, addr3 } = await loadFixture(deployContextRegisterVoter)

        // Add Voters (2)
        await voting.addVoter(addr1.address);
        await voting.addVoter(addr2.address);

        return { voting, owner, addr1, addr2, addr3 };
    };

    /**
     * Fixture DOS_GAS_LIMIT
     */

    async function deployContextVote_With_DOS_GAS_LIMIT() {
        const { voting, owner, addr1, addr2, addr3 } = await loadFixture(deployContextProposal)

        // Start registering Vote
        await voting.startProposalsRegistering()

        for (let index = 0; index < total_proposals; index++) {
            // Create 3 Proposals
            await voting.connect(addr1).addProposal("Proposal " + index)
        }

        // Close Registering Proposal
        await voting.endProposalsRegistering()

        return { voting, owner, addr1, addr2, addr3 };
    };

    context("Deploy with Fixture", function () {

        describe("DOS_GAS_LIMIT: Proposal", () => {

            it("DOS_GAS_LIMIT: should have Error after tallyVote() winning proposal winning is 2 not 0", async () => {
                const { voting, addr1, addr2 } = await loadFixture(deployContextVote_With_DOS_GAS_LIMIT)

                // Start session voting
                voting.startVotingSession()

                // Create Proposal (addr1)
                // 2 vote on proposal 2
                await voting.connect(addr1).setVote(2)
                await voting.connect(addr2).setVote(2)

                // Stop session vote
                voting.endVotingSession()
                // Tally vote
                voting.tallyVotes()

                // Check if a good winning proposal (should be -> 2)
                // tallyVote() crashed because upper gas limit (DOS)
                expect(Number(await voting.winningProposalID())).to.be.equal(0) // getWinningProposal

            });

        })

    })

})