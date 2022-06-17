/* eslint-disable prettier/prettier */

import { ContractTransaction } from 'ethers'
import { ethers } from 'hardhat'
// eslint-disable-next-line camelcase, node/no-missing-import
import { WavePortal, WavePortal__factory } from '../typechain'

async function main() {
	const [owner, randomPerson, anotherRandomPerson] = await ethers.getSigners()
	// eslint-disable-next-line camelcase
	const waveContractFactory: WavePortal__factory = await ethers.getContractFactory('WavePortal')
	const waveContract: WavePortal = await waveContractFactory.deploy({
		value: ethers.utils.parseEther('0.1'),
	})
	await waveContract.deployed()

	console.log('Contract deployed to:', waveContract.address)
	console.log('Contract deployed by:', owner.address)

	let contractBalance = await ethers.provider.getBalance(
		waveContract.address
	)
	console.log(
		'Saldo do contrato:',
		ethers.utils.formatEther(contractBalance)
	)
	
	// By owner
	let waveTxn: ContractTransaction = await waveContract.doWave('Mensagem 1')
	await waveTxn.wait()
	waveTxn = await waveContract.doWave('Mensagem 2')
	await waveTxn.wait()
	waveTxn = await waveContract.doLike(randomPerson.address)
	await waveTxn.wait()
	waveTxn = await waveContract.doLike(anotherRandomPerson.address)
	await waveTxn.wait()
	waveTxn = await waveContract.doLike(anotherRandomPerson.address)
	await waveTxn.wait()

	const randomMessage = Math.random() * 50
	const randomLikes = Math.random() * 100

	// By Random Person
	let wavePortal: WavePortal = waveContract.connect(randomPerson)
	for(let i = 0; i < randomMessage; i++) {
		waveTxn = await wavePortal.doWave(`By Random Person ${i}`)
		await waveTxn.wait()
	}
	for(let i = 0; i < randomLikes; i++) {
		waveTxn = await wavePortal.doLike(owner.address)
		await waveTxn.wait()
	}

	// By Another Random Person
	wavePortal = waveContract.connect(anotherRandomPerson)
	for(let i = 0; i < randomMessage; i++) {
		waveTxn = await wavePortal.doWave(`By Another Random Person ${i}`)
		await waveTxn.wait()
	}
	for(let i = 0; i < randomLikes; i++) {
		waveTxn = await wavePortal.doLike(randomPerson.address)
		await waveTxn.wait()
	}

	contractBalance = await ethers.provider.getBalance(
		waveContract.address
	)
	console.log(
		'Saldo do contrato:',
		ethers.utils.formatEther(contractBalance)
	)

	const allWaves = await waveContract.getAllWaves()
	console.log(allWaves)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})

/*
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const waveCount: BigNumber = await waveContract.getTotalWaves()
	let waveTxn: ContractTransaction = await waveContract.wave()

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
	// * /

	// We recommend this pattern to be able to use async/await everywhere
	// and properly handle errors.
*/
