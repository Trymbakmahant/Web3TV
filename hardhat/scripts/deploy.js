const {ethers} = require("hardhat");

const main = async () => {
  
  const contractFactory = await ethers.getContractFactory("Youtube");

  const Yotube = await contractFactory.deploy("0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa");

  await Yotube.deployed();

  console.log("Youtube is deployed at address ", Yotube.address);
};

main();