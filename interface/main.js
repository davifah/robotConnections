// Programa escrito por Davi Farhi
// GENESIS - RoboCup 2019

// ============ Variáveis ===============

const URL = 'http://127.0.0.1:8080';
const usuario = 'ui';
let controleConectado = false;

// ========== Função de loop ============

// Variáveis para determinar o número de atualizaçoes por segundo
const ticks = 60;

// Funçao executada automaticamente $ticks vezes por segundo
window.setInterval(function(){
    if (controleConectado){
        postControle(); // Executa funçao que pega dados do controle e posta no servidor
    }
},1000/ticks);