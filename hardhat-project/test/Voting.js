const {
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {

    context("Context Default", () => {
        let voting, owner, addr1;

        describe('Storage (Default) with before', () => {
            // Before run 1 time for test * storage default
            before(async () => {
                // Get Contract
                const Voting = await ethers.getContractFactory("Voting");
                // Deploy Contract
                voting = await Voting.deploy();
                voting.deployed();
                [owner, addr1] = await ethers.getSigners();
            })

            describe('Owner', () => {
                it("Expect: should have correct owner", async () => {
                    expect(await voting.owner()).to.be.hexEqual(owner.address);
                });

                it("Assert: should have correct owner", async () => {
                    assert.equal(await voting.owner(), owner.address);
                });
            })

            describe('WinningProposalID', () => {

                it("Expect: should have correct default winningProposalID", async () => {
                    expect(await voting.winningProposalID()).to.be.equal(0);
                });

                it("Assert: should have correct default winningProposalID", async () => {
                    assert.equal(await voting.winningProposalID(), 0);
                });
            })

            describe('WorkflowStatus', () => {

                it("Expect: should have correct default workflowStatus", async () => {
                    expect(await voting.workflowStatus()).to.be.equal(0);
                });

                it("Assert: should have correct default workflowStatus", async () => {
                    assert.equal(await voting.workflowStatus(), 0);
                });
            })

        });

    })

    context('WorkflowStatus BeforeEach', () => {
        let voting, owner, addr1, addr2, addr3;

        beforeEach(async () => {
            // Déploiement du contrat
            const Voting = await ethers.getContractFactory("Voting");
            voting = await Voting.deploy();

            // Get provider with signer
            [owner, addr1, addr2, addr3] = await ethers.getSigners();

        })

        describe("WorkflowStatus with owner", () => {

            it("should have correct error for not good status to (startProposalsRegistering)", async () => {
                const { voting } = await loadFixture(deployContextVote)

                // Start session voting
                voting.startVotingSession()
                voting.endVotingSession()

                // Check if status is not good for start proposal registering
                expect(voting.startProposalsRegistering())
                    .to.be.revertedWith("Registering proposals cant be started now");
            });

            it("should have correct WorkflowStatus (2 = ProposalsRegistrationEnded)", async () => {
                const { voting } = await loadFixture(deployContextVote)
                // Check if status is not good for start proposal registering
                expect(await voting.workflowStatus()).to.be.equal(2);
            });

            it("should have correct error for not good status for (endProposalsRegistering)", async () => {
                const { voting } = await loadFixture(deployContextProposal)

                voting.startProposalsRegistering()
                voting.endProposalsRegistering()
                voting.startVotingSession()

                // Check if no propose empty proposal
                expect(voting.endProposalsRegistering())
                    .to.be.revertedWith("Registering proposals havent started yet")

            });

            it("should have correct error for not good status for (startVotingSession)", async () => {
                const { voting } = await loadFixture(deployContextVote)

                // Start session voting
                voting.startVotingSession()
                voting.endVotingSession()

                // Check if voter no register can't vote
                expect(voting.startVotingSession())
                    .to.be.revertedWith("Registering proposals phase is not finished")

            });

            it("should have correct error for not good status to (endVotingSession)", async () => {
                const { voting } = await loadFixture(deployContextRegisterVoter)

                // Status for Create Proposal
                voting.startProposalsRegistering()
                voting.endProposalsRegistering()

                // Check error if not good status for add voter
                expect(voting.endVotingSession())
                    .to.be.revertedWith("Voting session havent started yet");
            });

        })

        describe("WorkflowStatus with no-owner", () => {

            it("should have correct error (startProposalsRegistering) with no-owner ", async () => {
                const { voting, addr1 } = await loadFixture(deployContextVote)
                const addr1Provider = voting.connect(addr1)
                // Check if status is not good for start proposal registering
                expect(addr1Provider.startProposalsRegistering()).to.be.reverted;
            });

            it("should have correct error for (endProposalsRegistering) with no-owner", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                voting.startProposalsRegistering()

                // Check if no propose empty proposal
                expect(addr1Provider.endProposalsRegistering()).to.be.reverted

            });

            it("should have correct error for (startVotingSession) with no-owner", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                voting.startProposalsRegistering()
                voting.endProposalsRegistering()

                // Check if no propose empty proposal
                expect(addr1Provider.startVotingSession()).to.be.reverted

            });

            it("should have correct error for (endVotingSession) with no-owner", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                voting.startProposalsRegistering()
                voting.endProposalsRegistering()
                voting.startVotingSession()

                // Check if no propose empty proposal
                expect(addr1Provider.endVotingSession()).to.be.reverted

            });

            it("should have correct error for (tallyVotes) with no-owner", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                voting.startProposalsRegistering()
                voting.endProposalsRegistering()
                voting.startVotingSession()
                voting.endVotingSession()

                // Check if no propose empty proposal
                expect(addr1Provider.tallyVotes()).to.be.reverted

            });

        })

    })

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

    async function deployContextVote() {
        const { voting, owner, addr1, addr2, addr3 } = await loadFixture(deployContextProposal)

        // Start registering Vote
        await voting.startProposalsRegistering()

        // Create 3 Proposals
        await voting.connect(addr1).addProposal("Proposal 1")
        await voting.connect(addr2).addProposal("Proposal 2")
        await voting.connect(addr1).addProposal("Proposal 3")

        // Close Registering Proposal
        await voting.endProposalsRegistering()

        return { voting, owner, addr1, addr2, addr3 };
    };

    async function deployContextTallied() {
        const { voting, owner, addr1, addr2, addr3 } = await loadFixture(deployContextVote)

        // Start voting session
        await voting.startVotingSession()

        // 2 vote on proposal 2
        await voting.connect(addr1).setVote(2)
        await voting.connect(addr2).setVote(2)

        return { voting, owner, addr1, addr2, addr3 };
    };

    context("Deploy with Fixture", function () {

        describe("Registration", () => {

            it("should have correct registration for voter (addr1) & getVoter (addr1)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextRegisterVoter)
                const addr1Providder = voting.connect(addr1)

                // Add new voter
                voting.addVoter(addr1.address);

                const voter = await addr1Providder.getVoter(addr1.address)

                // Check if voter is register
                expect(voter[0]).to.be.equal(true);
                expect(voter.isRegistered).to.be.equal(true);
                expect(voter.hasVoted).to.be.equal(false);
                expect(voter.votedProposalId).to.be.equal(0);
            });

            it("should have correct addr2 is not registration to voter (addVoter & getVoter)", async () => {
                const { voting, addr1, addr2 } = await loadFixture(deployContextRegisterVoter)
                const addr1Providder = voting.connect(addr1)

                // Add new voter
                voting.addVoter(addr1.address);

                const voter = await addr1Providder.getVoter(addr2.address)
                // Check if voter is not register
                expect(voter.isRegistered).to.be.equal(false);
            });

            it("should have correct error if voter is already register (addVoter)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextRegisterVoter)

                // Add new voter
                voting.addVoter(addr1.address);

                // Check if voter is already register
                expect(voting.addVoter(addr1.address))
                    .to.be.revertedWith("Already registered")
            });

            it("should have correct not getVoter if is not voter (getVoter)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextRegisterVoter)

                // Check if not a voter
                expect(voting.getVoter(addr1.address))
                    .to.be.revertedWith("You're not a voter")
            });

            it("should have correct error for not good status (addVoter)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextRegisterVoter)

                // Status for Create Proposal
                voting.startProposalsRegistering()

                // Check error if not good status for add voter
                expect(voting.addVoter(addr1.address))
                    .to.be.revertedWith("Voters registration is not open yet");
            });

            it("should have correct error for addVoter by no-owner (addVoter)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextRegisterVoter)
                const addr1Providder = voting.connect(addr1)

                // Check error if not good status for add voter
                expect(addr1Providder.addVoter(addr1.address)).to.be.reverted
            });

        })

        describe("Proposal", () => {

            it("should dont (getOneProposal) with no voter (owner)", async () => {
                const { voting } = await loadFixture(deployContextProposal)
                expect(voting.getOneProposal(0)).to.be.reverted;
            })

            it("should have correct status for register proposal (getOneProposal)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                // Status for Create Proposal
                await voting.startProposalsRegistering()

                // Get Proposal
                const proposal = await addr1Provider.getOneProposal(0)

                // Check if good proposal
                expect(proposal.description).to.be.equal("GENESIS"); // description
                expect(proposal.voteCount).to.be.equal(0); // voteCount

            });

            it("should have correct for add new proposal (addProposal && getOneProposal)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                // Status for Create Proposal
                voting.startProposalsRegistering()

                // Create Proposal
                addr1Provider.addProposal("Proposal 1")

                // Get Proposal
                const proposal = await addr1Provider.getOneProposal(1)

                // Check new proposal
                expect(proposal.description).to.be.equal("Proposal 1"); // description
                expect(proposal.voteCount).to.be.equal(0); // voteCount

            });

            it("should have correct status for dont create new proposal (addProposal)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                // Check status not ready for register proposal
                expect(addr1Provider.addProposal("Proposal 1"))
                    .to.be.revertedWith("Proposals are not allowed yet")
            });

            it("should have correct status for end to registred new proposal (addProposal)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                // Stop status registering proposal
                voting.endProposalsRegistering()

                // New status : Create Proposal -> Err
                expect(addr1Provider.addProposal("Proposal 1"))
                    .to.be.revertedWith("Proposals are not allowed yet")

            });

            it("should have correct error dont create new proposal empty (addProposal)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)
                const addr1Provider = voting.connect(addr1)

                // Status for Create Proposal
                voting.startProposalsRegistering()

                // Check if no propose empty proposal
                expect(addr1Provider.addProposal(""))
                    .to.be.revertedWith("Vous ne pouvez pas ne rien proposer")

            });

            it("should have correct error dont create new proposal if no  voter", async () => {
                const { voting, addr3 } = await loadFixture(deployContextProposal)
                const addr3Provider = voting.connect(addr3)

                // Status for Create Proposal
                voting.startProposalsRegistering()

                // Check if no propose empty proposal
                await expect(addr3Provider.addProposal("Proposal Not Voters"))
                    .to.be.revertedWith("You're not a voter")

            });

        })

        describe("Vote", () => {

            it("should have correct status is not open vote registration (setVote)", async () => {
                const { voting, addr1, addr2 } = await loadFixture(deployContextVote)
                const addr1Provider = voting.connect(addr1)

                // Check if not status for vote
                expect(addr1Provider.setVote(1))
                    .to.be.revertedWith("Voting session havent started yet")

            });

            it("should have correct vote registration (getOneProposal)", async () => {
                const { voting, addr1, addr2 } = await loadFixture(deployContextVote)
                const addr1Provider = voting.connect(addr1)
                const addr2Provider = voting.connect(addr2)

                // Start session voting
                voting.startVotingSession()

                // Create Proposal (addr1)
                addr1Provider.setVote(1)
                // Check Get Proposal
                expect((await addr1Provider.getOneProposal(1))[1]).to.be.equal(1);

                // Create Proposal (addr2)
                addr2Provider.setVote(1)
                // Check Get Proposal
                expect((await addr2Provider.getOneProposal(1)).voteCount).to.be.equal(2);

            });

            it("should have correct error for vote by already voter (setVote)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextVote)
                const addr1Provider = voting.connect(addr1)

                // Start session voting
                voting.startVotingSession()
                addr1Provider.setVote(1)

                // Check if voter no register can't vote
                expect(addr1Provider.setVote(1))
                    .to.be.revertedWith("You have already voted")

            });

            it("should have correct error for vote on proposal not found (setVote)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextVote)
                const addr1Provider = voting.connect(addr1)

                // Start session voting
                voting.startVotingSession()

                // Check if voter no register can't vote
                expect(addr1Provider.setVote(7))
                    .to.be.revertedWith("Proposal not found")

            });

            it("should have correct error for vote by no Voters (setVote)", async () => {
                const { voting, addr3 } = await loadFixture(deployContextVote)
                const addr3Provider = voting.connect(addr3)

                // Start session voting
                voting.startVotingSession()

                // Check if voter no register can't vote
                expect(addr3Provider.setVote(1))
                    .to.be.revertedWith("You're not a voter")

            });

        })

        describe("Tallied", () => {

            it("should have correct tallied (winningProposalID)", async () => {
                const { voting } = await loadFixture(deployContextTallied)

                // Stop session vote
                voting.endVotingSession()
                // Tally vote
                voting.tallyVotes()

                // Check if a good winning proposal
                expect(Number(await voting.winningProposalID())).to.be.equal(2) // getWinningProposal

            });

            it("should have not correct status for tallied (tallyVotes)", async () => {
                const { voting } = await loadFixture(deployContextTallied)

                // Check if a good winning proposal
                expect(voting.tallyVotes())
                    .to.be.revertedWith("Current status is not voting session ended") // getWinningProposal

            });

        })

        describe("Event", () => {

            it("Event -> VoterRegistered (addVoter)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextRegisterVoter)

                // Check if event return good value
                expect(voting.addVoter(addr1.address))
                    .to.be.emit(voting, "VoterRegistered")
                    .withArgs(addr1.address);
            })

            it("Event -> WorkflowStatusChange (endProposalsRegistering)", async () => {
                const { voting } = await loadFixture(deployContextRegisterVoter)

                voting.startProposalsRegistering()

                // Check if event return good value
                expect(voting.endProposalsRegistering())
                    .to.be.emit(voting, "WorkflowStatusChange")
                    .withArgs(1, 2);
            })

            it("Event -> ProposalRegistered (addProposal)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextProposal)

                voting.startProposalsRegistering()

                // Check if event return good value
                expect(voting.connect(addr1).addProposal("Proposal 1"))
                    .to.be.emit(voting, "ProposalRegistered")
                    .withArgs(1);
            })

            it("Event -> Voted (setVote)", async () => {
                const { voting, addr1 } = await loadFixture(deployContextVote)

                // Start voting session
                voting.startVotingSession()

                // Check if event return good value
                expect(voting.connect(addr1).setVote(1))
                    .to.be.emit(voting, "Voted")
                    .withArgs(String, String);
            })

        })

    })

})