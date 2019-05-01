// Programa escrito por Davi Farhi
// GENESIS - RoboCup 2019

// ============ Variáveis ===============

const URL = 'http://127.0.0.1:8080';
const usuario = 'ui';

//Variáveis de status

let cooler = true;
let power = true;
let server = false;
let controleConectado = false;
let arduino = false;
let RPi = false;
let temperatura = 0.00;
let tickrate

// ========== Função de loop ============

// Variáveis para determinar o número de atualizaçoes por segundo
const ticks = 20;

// Funçao executada automaticamente $ticks vezes por segundo
window.setInterval(function () {

	setStatus();

	if (controleConectado) {

		postHTTP(); // Executa funçao que pega dados do controle e posta no servidor

		if (server)
			getHTTP();
	}
}, 1000 / ticks);