require("@nomicfoundation/hardhat-toolbox");

const { INFURA_API_KEY, SEPOLIA_PRIVATE_KEY, GOERLI_PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19"
};
