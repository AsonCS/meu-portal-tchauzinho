/* eslint-disable prettier/prettier */

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat'

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	//   const Greeter = await ethers.getContractFactory("Greeter");
	//   const greeter = await Greeter.deploy("Hello, Hardhat!");

	//   await greeter.deployed();

	//   console.log("Greeter deployed to:", greeter.address);

	const WavePortal = await ethers.getContractFactory('WavePortal')
	const wave = await WavePortal.deploy()

	await wave.deployed()

	console.log('WavePortal deployed to:', wave.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
