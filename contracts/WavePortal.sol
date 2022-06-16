// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

	event NewWave(
		address indexed from,
		string[] messages,
		uint256 likes,
		uint256 timestamp
	);

	struct Wave {
		address user;
		uint8 ative;
		string[] messages;
		uint256 likes;
		uint256 timestamp;
	}

	mapping(address => uint256) private wavesMap;
	Wave[] private waves;

    constructor() {
        console.log("New WavePortal");
    }

	function doWave(string memory _message) public {
		// console.log("wave | sender: %s", msg.sender);
		// console.log("wave | _message: %s", _message);
		if (wavesMap[msg.sender] == 0) {
			wavesMap[msg.sender] = waves.length + 1;
			string[] memory _messages;
			waves.push(Wave(msg.sender, 1, _messages, 0, block.timestamp));
		}

		waves[wavesMap[msg.sender] - 1].messages.push(_message);

		Wave memory wave = waves[wavesMap[msg.sender] - 1];
		emit NewWave(wave.user, wave.messages, wave.likes, wave.timestamp);
	}

	function doLike() public {
		// console.log("like | sender: %s", msg.sender);
		if (wavesMap[msg.sender] == 0) {
			wavesMap[msg.sender] = waves.length + 1;
			string[] memory _messages;
			waves.push(Wave(msg.sender, 1, _messages, 0, block.timestamp));
		}

		waves[wavesMap[msg.sender] - 1].likes += 1;

		Wave memory wave = waves[wavesMap[msg.sender] - 1];
		emit NewWave(wave.user, wave.messages, wave.likes, wave.timestamp);
	}

	function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

	/**
		address[] private users;
		mapping(address => uint256) private wavesByUser;

		/*
		* Um pouco de mágica, use o Google para entender o que são eventos em Solidity!
		* /
		event NewWave(address indexed from, uint256 timestamp, string message);

		/*
		* Crio um struct Wave.
		* Um struct é basicamente um tipo de dados customizado onde nós podemos customizar o que queremos armazenar dentro dele
		* /
		struct Wave {
			address waver; // Endereço do usuário que deu tchauzinho
			string message; // Mensagem que o usuário envio
			uint256 timestamp; // Data/hora de quando o usuário tchauzinhou.
		}

		/*
		* Declara a variável waves que permite armazenar um array de structs.
		* Isto que me permite armazenar todos os tchauzinhos que qualquer um tenha me enviado!
		* /
		Wave[] waves;

		/*
		* Você notará que eu mudei um pouco a função de tchauzinho e agora requer uma string chamada _message. Esta é a mensagem que o nosso usuário enviou pelo frontend!
		* /
		function wave(string memory _message) public {
			totalWaves += 1;
			console.log("%s tchauzinhou com a mensagem %s", msg.sender, _message);

			/*
			* Aqui é onde eu efetivamenet armazeno o tchauzinho no array.
			* /
			waves.push(Wave(msg.sender, _message, block.timestamp));

			/*
			* Eu adicionei algo novo aqui. Use o Google para tentar entender o que é e depois me conte o que aprendeu em #general-chill-chat
			* /
			emit NewWave(msg.sender, block.timestamp, _message);
		}

		function wave() public {
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
		
		/*
		* Adicionei uma função getAllWaves que retornará os tchauzinhos.
		* Isso permitirá recuperar os tchauzinhos a partir do nosso site!
		* /
		function getAllWaves() public view returns (Wave[] memory) {
			return waves;
		}
	**/

}
