// ======= Funções do Controle ==========

function getInput(){
    let input = navigator.getGamepads(0)[0];   // Pega dados do controle na posição 0

    controleConectado = input.connected;    // Prevenção de erro: controle desconectar sem ativar evento

    let controle = {
        lBall : {
            x: input.axes[0].toFixed(3)*1000,
            y: input.axes[1].toFixed(3)*-1000
        },
        rBall : {
            x: input.axes[2].toFixed(3)*1000,
            y: input.axes[3].toFixed(3)*-1000
        },
        triggers : {
            left: input.buttons[6].value.toFixed(3)*1000,
            right: input.buttons[7].value.toFixed(3)*1000
        },
        buttons : {
            l1: input.buttons[4].pressed,
            r1: input.buttons[5].pressed,
            cross: input.buttons[0].pressed,
            circle: input.buttons[1].pressed, 
            square: input.buttons[2].pressed,
            triangle: input.buttons[3].pressed,
            up: input.buttons[12].pressed,
            down: input.buttons[13].pressed,
            left: input.buttons[14].pressed,
            right: input.buttons[15].pressed,
            share: input.buttons[8].pressed,
            options: input.buttons[9].pressed,

        },
    }

    return controle;
}

window.addEventListener("gamepadconnected", (event) => {
    controleConectado = true;
});

window.addEventListener("gamepaddisconnected", (event) => {
    controleConectado = false;
});

// ======= Funções do Servidor ==========

function postHTTP(){
    let dados = {
        usuario : usuario,
        controle : getInput(),
        status : {
            power : power,
            cooler : cooler,
        },
    };
    $('#test').text(JSON.stringify(dados,null,'\t'));

    $.post(
        URL,
        JSON.stringify(dados),
        (_res, status) => status=="success" ? server = true : null
    ).fail(() => server = false);
};

function getHTTP(){
    $.get(
        URL,
        { usuario: usuario },
        (dados, status) => {
            status=="success" ? server = true : null;
            dados = JSON.parse(dados);
            RPi = dados.connected;
            if (RPi){
                dados = dados.dados;
            }
        }
    );
}