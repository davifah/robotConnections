// ======= Funções do Servidor ==========

function postHTTP() {
    let output = getInput();

    $.post(
        URL,
        JSON.stringify(output),
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
            input = JSON.parse(dados);
            RPi = input.connected;
            if (RPi) {
                arduino = input.arduino;
                temperatura = parseFloat(input.temperatura);
                tickrate = parseInt(input.ticks);
            }
        }
    );
}