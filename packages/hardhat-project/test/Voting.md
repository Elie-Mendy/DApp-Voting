# Install

```sh
git clone https://github.com/Elie-Mendy/Alyra-Projet3/tree/main;
cd Alyra-Projet3;
yarn;
```

#### Run Test / Deploy contract / ...

```sh
yarn sc:test
yarn sc:coverage
```

#### Deploy on local chain:

```sh
yarn blockchain
yarn sc:deploy:local
```

#### Pour utiliser les commandes par default de hardhat

```
cd packages/hardhat-project
npx hardhat ...
```

##### Test

Les test m'ont permis de checker les différentes variantes utilisations du contrat de manières basique. 
J'ai aussi peu essayé les variantes de librairie que ce soit assert et expect avec chai.
J'ai pu utiliser les différents hook fournit avec chaï ou bien hardhat (before, beforeEach, after, afterEach, fixture)

✅ - `Context Default` : je check les states par default du contrat

Owner, WinningProposalID, WorkflowStatus

✅ - `WorkflowStatus` : Je check les différente fonction lié au changement de status, en tant que owner, ou non owner, ou bien au mauvais moment

startProposalsRegistering, ProposalsRegistrationEnded, endProposalsRegistering, startVotingSession, endVotingSession, tallyVotes

✅ - `Deploy with Fixture` : Je check la logique d'utilisation du contrat suivant ses différentes étapes.

Registration, Proposal, Vote, Tallied, Event

Voici si dessous le resultat du test

# Test réalisé avec hardhat


```sh
└──╼ (main) $ yarn sc:coverage
yarn run v1.22.19
$ npm run coverage --workspace=hardhat-project

> hardhat-project@0.1.0 coverage
> npx hardhat coverage


Version
=======
> solidity-coverage: v0.8.2

Instrumenting for coverage...
=============================

> Voting.sol

Compilation:
============

Nothing to compile

Network Info
============
> HardhatEVM: v2.14.1
> network:    hardhat



  Voting
    Context Default
      Storage (Default) with before
        Owner
          ✔ Expect: should have correct owner
          ✔ Assert: should have correct owner
        WinningProposalID
          ✔ Expect: should have correct default winningProposalID
          ✔ Assert: should have correct default winningProposalID
        WorkflowStatus
          ✔ Expect: should have correct default workflowStatus
          ✔ Assert: should have correct default workflowStatus
    WorkflowStatus BeforeEach
      WorkflowStatus with owner
        ✔ should have correct WorkflowStatus (2 = ProposalsRegistrationEnded) (185ms)
        ✔ should have correct error for not good status to (startProposalsRegistering)
        ✔ should have correct error for not good status for (endProposalsRegistering)
        ✔ should have correct error for not good status for (startVotingSession) (93ms)
        ✔ should have correct error for not good status to (endVotingSession)
      WorkflowStatus with no-owner
        ✔ should have correct error (startProposalsRegistering) with no-owner  (97ms)
        ✔ should have correct error for (endProposalsRegistering) with no-owner
        ✔ should have correct error for (startVotingSession) with no-owner
        ✔ should have correct error for (endVotingSession) with no-owner
        ✔ should have correct error for (tallyVotes) with no-owner
    Deploy with Fixture
      Registration
        ✔ should have correct registration for voter (addr1) & getVoter (addr1)
        ✔ should have correct addr2 is not registration to voter (addVoter & getVoter)
        ✔ should have correct error if voter is already register (addVoter)
        ✔ should have correct not getVoter if is not voter (getVoter)
        ✔ should have correct error for not good status (addVoter)
        ✔ should have correct error for addVoter by no-owner (addVoter)
      Proposal
        ✔ should dont (getOneProposal) with no voter (owner)
        ✔ should have correct status for register proposal (getOneProposal)
        ✔ should have correct for add new proposal (addProposal && getOneProposal)
        ✔ should have correct status for dont create new proposal (addProposal)
        ✔ should have correct status for end to registred new proposal (addProposal)
        ✔ should have correct error dont create new proposal empty (addProposal)
        ✔ should have correct error dont create new proposal if no  voter
      Vote
        ✔ should have correct status is not open vote registration (setVote) (72ms)
        ✔ should have correct vote registration (getOneProposal) (59ms)
        ✔ should have correct error for vote by already voter (setVote)
        ✔ should have correct error for vote on proposal not found (setVote)
        ✔ should have correct error for vote by no Voters (setVote)
      Tallied
        ✔ should have correct tallied (winningProposalID) (81ms)
        ✔ should have not correct status for tallied (tallyVotes)
      Event
        ✔ Event -> VoterRegistered (addVoter)
        ✔ Event -> WorkflowStatusChange (endProposalsRegistering)
        ✔ Event -> ProposalRegistered (addProposal)
        ✔ Event -> Voted (setVote) (74ms)


  40 passing (2s)

-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |      100 |      100 |      100 |      100 |                |
  Voting.sol |      100 |      100 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|
All files    |      100 |      100 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
Done in 5.58s.


```

