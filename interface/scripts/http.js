// ======= Funções do Servidor ==========

function postHTTP() {
    let output = dadosOutput();

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
//            console.log(dados);
            input = JSON.parse(dados);
            RPi = input.connected;
            if (RPi) {
                arduino = input.dados.arduino;
                temperatura = parseInt(input.dados.temperatura);
                tickrate = parseInt(input.dados.ticks);
                potenciometro = parseInt(input.dados.potenciometro);
            }
        }
    );
}