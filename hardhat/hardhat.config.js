require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const POLYGON_MUMBAI = process.env.POLYGON_MUMBAI;
const PVT_KEY = process.env.PVT_KEY;

module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai:{
      url: POLYGON_MUMBAI,
      accounts: [PVT_KEY]
    }
  }
};
