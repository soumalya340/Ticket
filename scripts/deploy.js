// imports
const { ethers, run, network } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
//hre.changeNetwork("mumbai");

let amount;
const p = path.join(__dirname, "..", "data", "products.json");
try {
  const data = fs.readFileSync(p, "utf8");
  console.log(JSON.parse(data));
  amount = JSON.parse(data);
} catch (err) {
  console.error(err);
}

console.log(amount.amount);
async function main() {
  console.log(network.name);
  console.log(amount);
  const price = ethers.utils.parseEther(`1`);
  const ticketFactory = await ethers.getContractFactory("Ticket");
  console.log("Deploying Ticket contract...");
  const ticket = await ticketFactory.deploy(price);
  await ticket.deployed();
  console.log(`Deployed FlowMarketplace contract to: ${ticket.address}`);
  console.log(`${await ticket.minValue()}`);

  /// VERIFY
  if (network.config.chainId === 80001 && process.env.API_KEY) {
    console.log("Waiting for block confirmations...");
    await ticket.deployTransaction.wait(6);
    await verify(ticket.address, [price]);
  }
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
