let triangleAnterior = false;

// ======= Funções do Controle ==========

function getInput() {
    let input = navigator.getGamepads(0)[0]; // Pega dados do controle na posição 0

    controleConectado = input.connected; // Prevenção de erro: controle desconectar sem ativar evento

    let controle = {
        lBall: {
            x: input.axes[0].toFixed(3) * 1000,
            y: input.axes[1].toFixed(3) * -1000
        },
        rBall: {
            x: input.axes[2].toFixed(3) * 1000,
            y: input.axes[3].toFixed(3) * -1000
        },
        triggers: {
            left: input.buttons[6].value.toFixed(3) * 1000,
            right: input.buttons[7].value.toFixed(3) * 1000
        },
        buttons: {
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

    return output(controle);
}

function output(controle) {
    let dados = {
        usuario: usuario,

        brightLED: map(controle.triggers.left, 0, 1000, 0, 255),
        greenLED: controle.buttons.cross,

        status: {
            cooler: cooler
        },

        motorD: {
            a: 0,
            b: 0
        },
        motorE: {
            a: 0,
            b: 0
        }
    };

    if (controle.buttons.triangle == true && triangleAnterior != true) direcao = !direcao;
    triangleAnterior = controle.buttons.triangle;

    const controle_min = 100;
    const motores_min = 130;
    const motores_max = 255;
    if (power && controle.triggers.right >= controle_min) {
        potencia = map(controle.triggers.right, controle_min, 1000, motores_min, motores_max);

        if (direcao) {    //motores devem girar para frente
            dados.motorD.a = potencia;

        } else {          //motores devem girar para trás
            dados.motorD.b = potencia;

        }
    }

    return dados;
}

// Conexão do controle
window.addEventListener("gamepadconnected", () => {
    controleConectado = true;
});

window.addEventListener("gamepaddisconnected", () => {
    controleConectado = false;
});

//Função map
function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}