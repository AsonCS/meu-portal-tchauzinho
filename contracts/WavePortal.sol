// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

	address[] private users;
	mapping(address => uint256) private wavesByUser;
	uint256 private totalWaves;

    constructor() {
		uint _test = uint(keccak256("wow"));
        console.log("Vamos ver se no que da: '%s'", _test);
    }

	function wave() public {
		totalWaves += 1;
		if (wavesByUser[msg.sender] == 0) {
			users.push(msg.sender);
		}
		wavesByUser[msg.sender] += 1;
		console.log("%s deu tchauzinho!", msg.sender);
	}

	function printAll() public view {
		for(uint256 i = 0; i < users.length; i++) {
			string memory tchau = "tchau";
			uint256 amountWaves = wavesByUser[users[i]];
			if (amountWaves > 1) {
				tchau = "tchauzinhos";
			}
			console.log("Usuario '%s' ja deu '%d' %s", users[i], amountWaves, tchau);
		}
	}

	function getTotalWaves() public view returns (uint256) {
		console.log("Temos um total de %d tchauzinhos!", totalWaves);
		return totalWaves;
	}

}
