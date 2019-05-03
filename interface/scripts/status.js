
//Variáveis de status

let cooler = true;
let RPi = false;
let power = true;
let sensors = false;
let server = false;
let controleConectado = false;
let arduino = false;
let direcao = true; // true = frente

// Função de atualização dos status
function setStatus() {

	if (controleConectado) {
		$('#warn-controle').text("Controle: conectado")
		$('.toHide').show();

		if(direcao){
			$('#warn-direcao').text("Direção: frontal");
		}else{
			$('#warn-direcao').text("Direção: traseira");
		}

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

		if (!sensors) {
			$('#sensorsStatus').text("Mostrar mais");
		} else {
			$('#sensorsStatus').text("Esconder");
		}

		if (server) {
			$('#warn-http').text("HTTP: conectado");
		} else {
			$('#warn-http').text("HTTP: desconectado");
		}

		if (RPi) {
			$('#tickrate').text(`Tickrate: ${tickrate}`);
			$('#warn-rpi').text("RPi: conectada");
			$('#warn-temp').text(`Temperatura: ${temperatura} °C`);
			if (arduino){
				$('#warn-arduino').text("Arduino: conectado");
				$('#potenciometro').text(`Potenciometro: ${potenciometro}`);
			}else{
				$('#warn-arduino').text("Arduino: desconectado");
				$('#potenciometro').text("Potenciometro: ");
			}
		} else {
			$('#tickrate').text("Tickrate:");
			$('#warn-rpi').text("RPi: desconectada");
			$('#warn-temp').text("Temperatura:");
			$('#warn-arduino').text("Arduino: desconectado");
		}

	} else {
		$('#warn-controle').text("Conecte o controle");
		$('#warn-http').text("HTTP:");
		$('.toHide').hide();
		$('#sensors-table').hide();

		$('#warn-rpi').text("");
		$('#warn-temp').text("");
		$('#warn-arduino').text("");
		$('#warn-http').text("");
		$('#warn-direcao').text("");
	}

}

function menuClick(){
	sensors=!sensors;
	$('#sensors-table').toggle(200);
}