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

/*
SOME0=WavePortal 1.0
SOME1=No need to generate any newer typings.
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  25000000000000000
SOME4=WavePortal address:  0x6422748a7dcC81F729d29904150bFd5c7D526faf

SOME0=WavePortal 1.0
SOME1=No need to generate any newer typings.
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  23947890993537776
SOME4=WavePortal address:  0x602eec643c68Fe7083Bd0CB84d50838798b16631
*/
