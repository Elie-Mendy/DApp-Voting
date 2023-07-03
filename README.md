# Alyra-Projet3

Repo made with hardhat, next, viem, wagmi, rainbowkit, openzepplin, ...

## Présentation : 

Ce projet est le résultat d'une collaboration antérieur au projet 3.
Lors des semaines consacré à l'apprentissage de Solidity nous avions déjà travaillé sur la conception d'une architecture commune de projet comprenant la partie backend réalisé avec Hardhat et le front-end réalisé avec NextJs. 

Sur cette base nous avions donc créé initialement une Application décentralisée de voting chacun de notre coté. qui nous ont par la suite servi à realiser le projet 3. 

Les repos de ces projets sont disponibles à ces addresses: 
- [xDrKush - starterkit-dapp](https://github.com/xdrkush/starterkit-dapp)
- [Elie-MENDY - voting-dapp](https://github.com/Elie-Mendy/voting-dapp)

Nous présentons donc ici un projet qui s'avère etre la fusion de nos projet respectifs, comprenant  les améliorations apportés à ces dernières. (refonte graphique, déploiement et écoute d'evenements sur le réseau sepolia, correction de la faille de sécurité)


### Cette DApp couvre les cas d'utilisation du contrat `voting.sol`:

  - L'affichage diffère selon le profile connecté 
    - Ecran réservé aux personnes externes à l'organisatio (redirection des personnes non whitelisté vers cet écran)
    - neon sous la navbar suivant un code couleur selon le profil utilisateur 
  - Un affichage theme sombre / clair 
  - On peut se connecté avec son wallet grâce à rainbowkit, wagmi, et viem
  - Le owner peut enregistrer des nouvelles address en voter
  - Des watchers sont utilisés pour déclencher des fonctions de rafraichissement de l'application à l'écoutes des évents.
  - les voters peuvent récupérer les informations des voter, et des proposals.
  - Le owner peut changer les différents status du contrat de voting depuis le BO
  - Les voters peuvent soummettre une proposal
  - les voters peuvent voter selon le status du contrat
  - Une comptabilisation des votes est faites par le owner
  

### Pour l'exercices nous devions corriger la faille DOS_GAS_LIMIT de la fonction tally_vote:
  - plus d'info ici `./packages/hardhat-project/test/Voting_DOS_GAS_LIMIT.md`
  - le contrat corrigé est ici `./packages/hardhat-project/contracts/Voting-v-2.0.sol`
  

### Le script de déploiement à été changer:

```js
const Voting = await hre.ethers.getContractFactory("VotingV2");
```

##### Les tests uintaires suivent toujours le meme fonctionement.
  - plus d'info `./packages/hardhat-project/test/Voting.js`

___

## Lien vers la vidéo de présentation de la dapp

[Présentation vidéo](https://www.loom.com/share/265a554c9b274614bff16e38eda518af)

___

## Lien vers l'application déployée en production

[https://alyra-projet3-dapp.vercel.app](https://alyra-projet3-dapp.vercel.app)

___

## Installation
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

## Create architecture
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

## About
  - [Workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) is created in `./packages` for manage multi-packages node easily.

___

## Docs
  - [NextJs](https://nextjs.org/) 
  - [Chakra-UI](https://chakra-ui.com/) 
  - [Hardhat](https://hardhat.org/) 
  - [Viem](https://viem.sh/docs/getting-started.html) 
  - [Wagmi](https://wagmi.sh/)
  - [Rainbow-Kit](https://www.rainbowkit.com/)  
  - [Solidity](https://soliditylang.org/)

___

###### Created By [Elie-Mendy](https://github.com/Elie-Mendy) & [xDrKush](https://github.com/xdrkush)
