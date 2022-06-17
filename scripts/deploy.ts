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
	const waveContractFactory: WavePortal__factory = await ethers.getContractFactory('WavePortal')
	const waveContract: WavePortal = await waveContractFactory.deploy({
		value: ethers.utils.parseEther('0.01'),
	})
	await waveContract.deployed()

	console.log('WavePortal address: ', waveContract.address)
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

SOME0=WavePortal 2.0
SOME1=No need to generate any newer typings.
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  23947890993537776
SOME4=WavePortal address:  0x602eec643c68Fe7083Bd0CB84d50838798b16631

SOME0=WavePortal 3.0
SOME1=No need to generate any newer typings.
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  21689408480928912
SOME4=WavePortal address:  0x9295E4D1c8625Bd3741683EA57b3Ee05Bd199cef

SOME0=WavePortal 4.0
SOME1=No need to generate any newer typings.
SOME2=Deploying contracts with account:  0x7e4d9Fc4bdec1fe100F60041C372270F0E2eDD97
SOME3=Account balance:  16943628946478410
SOME4=WavePortal address:  0x06380A711Cc060581E8c78759e83e0f4ddd82B13
*/
