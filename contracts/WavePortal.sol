// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
		uint _test = uint(keccak256("wow"));
        console.log("Vamos ver se no que da: '%s'", _test);
    }
}
