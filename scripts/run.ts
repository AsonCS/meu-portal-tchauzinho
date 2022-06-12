/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'
// eslint-disable-next-line camelcase
import { WavePortal, WavePortal__factory } from '../typechain'

async function main() {
	// eslint-disable-next-line camelcase
	const waveContractFactory: WavePortal__factory = await ethers.getContractFactory('WavePortal')
	const waveContract: WavePortal = await waveContractFactory.deploy()
	await waveContract.deployed()
	console.log('Contract deployed to:', waveContract.address)
}

async function runMain() {
	try {
		await main()
		// eslint-disable-next-line no-process-exit
		process.exit(0)
	} catch (error) {
		console.log(error)
		// eslint-disable-next-line no-process-exit
		process.exit(1)
	}
}

runMain()
