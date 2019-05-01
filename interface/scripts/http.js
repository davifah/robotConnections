// ======= Funções do Servidor ==========

function postHTTP() {
	let dados = {
		usuario: usuario,
		controle: getInput(),
		status: {
			power: power,
			cooler: cooler,
		},
	};

	$.post(
		URL,
		JSON.stringify(dados),
		(_res, status) => status == "success" ? server = true : null
	).fail(() => server = false);
};

function getHTTP() {
	$.get(
		URL,
		{ usuario: usuario },
		(dados, status) => {
			status == "success" ? server = true : null;
			$('#test').text(dados);
			dados = JSON.parse(dados);
			RPi = dados.connected;
			if (RPi) {
				dados = dados.dados;
				arduino = dados.dados.arduino;
				temperatura = parseFloat(dados.dados.temperatura);
				tickrate = parseInt(dados.dados.ticks);
			}
		}
	);
}