# Config

Limit of contract is, if equality on proposal, then the first proposalID with the total_votes win (default error).

____

DOS_GAS_LIMIT is an simple error of memory. In example tally_votes dont are use if 10_000 proposals, the memory freeze because the function cost is limit for exec function.

In hardhat.config.js set params `blockGasLimit` for set the gasLimit accepted:

```js
...
networks: {
    hardhat: {
      blockGasLimit: 3000000 // Default 30_000_000
    },
}
...
```

setTimeout on `describe`

```js
this.timeout(3 * (60 * 1000))
```

##### Test

Create `N` Proposals (10_000 in example):
```js
for (let index = 0; index < 10000; index++) {
    // Create 3 Proposals
    await voting.connect(addr1).addProposal("Proposal " + index)
}
```

Result function tallyVote() -> crashed.

#### Correction with

in function `setVote()` and t
```js

uint private TmpWinningProposalID;

function setVote(uint _id) external onlyVoters {
    ...

    if (proposalsArray[_id].voteCount > proposalsArray[TmpWinningProposalID].voteCount) {
        TmpWinningProposalID = _id;
    }

    ...
}

...
function tallyVotes() external onlyOwner {
    ...
    
    winningProposalID = TmpWinningProposalID;

    ...
}

```

Set `winningProposalID` after vote for no load loop in function, because the loop DOS gas limit of contract.
