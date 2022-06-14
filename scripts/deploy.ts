/* eslint-disable prettier/prettier */

import { ethers } from 'hardhat'
// eslint-disable-next-line camelcase, node/no-missing-import
import { WavePortal, WavePortal__factory } from '../typechain'

async function main() {
	const [deployer] = await ethers.getSigners()
	const accountBalance = await deployer.getBalance()

	console.log('Deploying contracts with account: ', deployer.address)
	console.log('Account balance: ', accountBalance.toString())

	// eslint-disable-next-line camelcase
	const Token: WavePortal__factory = await ethers.getContractFactory('WavePortal')
	const portal: WavePortal = await Token.deploy()
	await portal.deployed()

	console.log('WavePortal address: ', portal.address)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
