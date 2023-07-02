# Alyra-Projet3

Repo made with hardhat, next, viem, wagmi, rainbowkit, openzepplin, ...

##### Cette DApp couvre les cas d'utilisation du contrat `voting.sol`:

  - L'affichage diffère selon le profile connecté (neon sous la navbar)
  - On peut ce connecté avec son wallet grâce à rainbowkit, wagmi, et viem
  - Le owner peut enregistrer des nouvelles address en voter
  - Des watchers sont utiliser pour déclencher des fonctions de rafraichissement de l'application à l'écoutes des évents.
  - les voters peuvent récupérer les informations de voter, et des proposals
  - Le owner peut changé les différents status du contrat de voting depuis le BO
  - Les voters peuvent proposer une proposal
  - les voters peuvent voté selon le status du contrat
  - Une comptabilisation des votes est faites par le owner

##### Pour l'exercices nous devions corriger la faille DOS_GAS_LIMIT de la fonction tally_vote:
  - plus d'info ici `./packages/hardhat-project/test/Voting_DOS_GAS_LIMIT.md`
  - le contrat corrigé est ici `./packages/hardhat-project/contracts/Voting-v-2.0.sol`
  

##### Le script de déploiement à été changer:

```js
const Voting = await hre.ethers.getContractFactory("VotingV2");
```

##### Les tests uintaires sont toujours les memes fonctionement.
  - plus d'info `./packages/hardhat-project/test/Voting.js`

___

#### Lien vers la vidéo de présentation de la dapp

[Lien](https://liendelavideo.com)

___

## Install
```sh
git clone https://github.com/Elie-Mendy/Alyra-Projet3/tree/main
cd Alyra-Projet3
yarn
```
Or in 1 line
```sh
git clone https://github.com/Elie-Mendy/Alyra-Projet3/tree/main; cd Alyra-Projet3; yarn;
```

##### Run Blockchain localhost:8545 (hardhat)
```sh
yarn blockchain
```

##### Run Front
(new terminal), ctrl+shift+t
```sh
yarn dapp:dev
```

##### Run Test / Deploy contract / ...
(new terminal), ctrl+shift+t
```sh
yarn sc:test
yarn sc:coverage
yarn sc:deploy:local
yarn sc:deploy:sepolia
```
____

### Create architecture
```shell
mkdir Alyra-Projet3
cd  Alyra-Projet3
mkdir hardhat-project
cd hardhat-project
npx hardhat
cd ..
npx create-next-app dapp
```
Or in 1 line
```sh
mkdir Alyra-Projet3; cd  Alyra-Projet3; mkdir hardhat-project; cd hardhat-project; npx hardhat; cd ..; npx create-next-app dapp;
```

___

### About
  - [Workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) is created in `./packages` for manage multi-packages node easily.

___

### Docs
  - [NextJs](https://nextjs.org/) 
  - [Chakra-UI](https://chakra-ui.com/) 
  - [Hardhat](https://hardhat.org/) 
  - [Viem](https://viem.sh/docs/getting-started.html) 
  - [Wagmi](https://wagmi.sh/)
  - [Rainbow-Kit](https://www.rainbowkit.com/)  
  - [Solidity](https://soliditylang.org/)

___

###### Created By [Elie-Mendy](https://github.com/Elie-Mendy) & [xDrKush](https://github.com/xdrkush)
