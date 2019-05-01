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