# Config

Limit of contract is, if equality on proposal, then le first proposalID with the total_votes win.

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

in function `setVote()`
```js
    if (proposalsArray[_id].voteCount > proposalsArray[winningProposalID].voteCount) {
        winningProposalID = _id;
    }
```

Set `winningProposalID` after vote for no load loop in function, because the loop DOS gas limit of contract.
