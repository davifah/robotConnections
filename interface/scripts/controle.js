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

    return controle;
}

function dadosOutput() {
    let controle = getInput();
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

    const analog_min = 90;
    const trigger_min = 20;
    const motores_min = 80;
    const motores_max = 255;

    if (power) {
        if (Math.abs(controle.lBall.x) >= analog_min) {

            analog = Math.abs(controle.lBall.x);
            potencia = map(analog, analog_min, 1000, motores_min, motores_max);

            if (controle.lBall.x > 0) {                 //virar para a direita
                dados.motorD.b = potencia;
                dados.motorE.a = potencia;
            } else {                                    //virar para a esquerda
                dados.motorD.a = potencia;
                dados.motorE.b = potencia;
            }

        } else if (controle.triggers.right >= trigger_min) {
            potencia = map(controle.triggers.right, trigger_min, 1000, motores_min, motores_max);

            if (direcao) {    //motores devem girar para frente
                dados.motorD.a = potencia;
                dados.motorE.a = potencia;

            } else {          //motores devem girar para trás
                dados.motorD.b = potencia;
                dados.motorE.b = potencia;

            }
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
    return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}