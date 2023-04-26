const { run } = require("hardhat");
const hre = require("hardhat");

exports.deploy = async () => {
  try {
    await run("compile");
    await run("run", {
      script: "scripts/deploy.js",
    });
    console.log("Script execution successful!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
