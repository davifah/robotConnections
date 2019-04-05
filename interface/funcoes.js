
// ======= Funções do Controle ==========

function getInput(){
    var input = navigator.getGamepads(0)[0];   // Pega dados do controle na posição 0

    controleConectado = input.connected;    // Prevenção de erro: controle desconectar sem ativar evento

    var controle = {
        LBallX: input.axes[0].toFixed(3)*1000,
        LBallY: input.axes[1].toFixed(3)*-1000,     //Negativo para o sentido do eixo Y ser para frente 
        RBallX: input.axes[2].toFixed(3)*1000,
        RBallY: input.axes[3].toFixed(3)*-1000,     //Negativo para o sentido do eixo Y ser para frente
        LTrigger: input.buttons[6].value.toFixed(3)*1000,
        RTrigger: input.buttons[7].value.toFixed(3)*1000,
        Rbutton: input.buttons[4].pressed,
        Lbutton: input.buttons[5].pressed,
        buttonC: input.buttons[0].pressed,          //Cruz
        buttonB: input.buttons[1].pressed,          //Bola
        buttonT: input.buttons[2].pressed,          //Triangulo
        buttonQ: input.buttons[3].pressed,          //Quadrado
        buttonUp: input.buttons[12].pressed,
        buttonDown: input.buttons[13].pressed,
        buttonLeft: input.buttons[14].pressed,
        buttonRight: input.buttons[15].pressed,
        buttonShare: input.buttons[8].pressed,
        buttonOptions: input.buttons[9].pressed,
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

function postControle(){
    controle = getInput();
    controle.usuario = usuario;
    $.post(URL,JSON.stringify(controle),function(dados,status){
        
        $('#test').text(dados);
        if (status != 'success')    $('#warn-web-conexao').text('Erro na conexão com o servidor');
        else                        $('#warn-web-conexao').text('');
    });
};