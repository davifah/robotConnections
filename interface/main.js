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

// Função de atualização dos status
function setStatus() {

	if (!cooler) {
		$('#coolerStatus').text("CoolerOff");
		$('#coolerStatus').css('background-color', '#ff471a');
	} else {
		$('#coolerStatus').text("CoolerOn");
		$('#coolerStatus').css('background-color', '#00b33c');
	}

	if (!power) {
		$('#powerStatus').text("PowerOff");
		$('#powerStatus').css('background-color', '#ff471a');
	} else {
		$('#powerStatus').text("PowerOn");
		$('#powerStatus').css('background-color', '#00b33c');
	}

	if (controleConectado) {
		$('#warn-controle').text("Controle: conectado")
		$('.toHide').show();
	} else {
		$('#warn-controle').text("Controle: desconectado");
		$('#warn-http').text("HTTP:");
		$('.toHide').hide();
	}

	if (server) {
		$('#warn-http').text("HTTP: conectado");
	} else {
		$('#warn-http').text("HTTP: desconectado");
	}

	if (RPi) {
		$('#warn-tickrate').text(`Tickrate: ${tickrate}`);
		$('#warn-rpi').text("RPi: conectada");
		$('#warn-temp').text(`Temperatura: ${temperatura} °C`);
		if (arduino) $('#warn-arduino').text("Arduino: conectado");
		else $('#warn-arduino').text("Arduino: desconectado");
	} else {
		$('#warn-tickrate').text("Tickrate:");
		$('#warn-rpi').text("RPi: desconectada");
		$('#warn-temp').text("Temperatura:");
		$('#warn-arduino').text("Arduino: desconectado");
	}
}