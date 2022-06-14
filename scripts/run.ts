/* eslint-disable prettier/prettier */

import { BigNumber, ContractTransaction } from 'ethers'
import { ethers } from 'hardhat'
// eslint-disable-next-line camelcase, node/no-missing-import
import { WavePortal, WavePortal__factory } from '../typechain'

async function main() {
	const [owner, randomPerson, anotherRandomPerson] = await ethers.getSigners()
	// eslint-disable-next-line camelcase
	const waveContractFactory: WavePortal__factory = await ethers.getContractFactory('WavePortal')
	const waveContract: WavePortal = await waveContractFactory.deploy()
	await waveContract.deployed()

	console.log('Contract deployed to:', waveContract.address)
	console.log('Contract deployed by:', owner.address)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const waveCount: BigNumber = await waveContract.getTotalWaves()
	let waveTxn: ContractTransaction = await waveContract.wave()
	await waveTxn.wait()
	await waveContract.getTotalWaves()

	for(let i = 0; i < Math.random() * 10; i++) {
		waveTxn = await waveContract.connect(randomPerson).wave()
		await waveTxn.wait()
	}
	await waveContract.getTotalWaves()

	for(let i = 0; i < Math.random() * 10; i++) {
		waveTxn = await waveContract.connect(anotherRandomPerson).wave()
		await waveTxn.wait()
	}
	await waveContract.getTotalWaves()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const printAll: void = await waveContract.printAll()
}

/*
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
// */

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
