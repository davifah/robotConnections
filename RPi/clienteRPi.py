import requests
# biblioteca responsável por acessar o servidor web (2.18.4)
import serial
# biblioteca responsável por estabelecer a comunicaçao com o Arduino (3.4)
import json
from gpiozero import CPUTemperature
# biblioteca para monitorar temperatura da cpu
from classes.tempo import Tempo

# ============ Variáveis =============
URL = 'http://192.168.0.17:8080'
arduinoPort = '/dev/ttyS0'
usuario = 'RPi'
baudrate = 200000

# =========== Instâncias =========

# Instância da porta Serial para comunicação com Arduino
ser = serial.Serial(
    port=arduinoPort,
    baudrate=baudrate,
    timeout=2/15,
    write_timeout=2/15
)
# Instância para medir temperatura da CPU
cpu = CPUTemperature()
# Instância para pegar tickrate
tmp = Tempo()

# Dicionário (do JS: Objeto) de dados
dadosPost = {
    "usuario": usuario,
    "dados": {
        "temperatura": 0.00,
        "arduino": False,
        "potenciometro": None,
        "ticks": 0
    }

}

# ========= Funções ============

def main():
    dadosOutput = dadosPost
    dados = requests.get(URL, params={'usuario': usuario}).json()

    ser.write(json.dumps(dados).encode('utf-8')+b'\x03')

    try:
        readSerial = ser.read_until().decode('utf-8')
    except TimeoutError:
        print("Timeout")
    
    if(readSerial):
        dadosOutput["dados"]["arduino"] = True
    else:
        dadosOutput["dados"]["arduino"] = False

    try:
        arduinoInput = json.loads(readSerial) #json.decoder.JSONDecodeError
    except json.decoder.JSONDecodeError:
        dadosOutput["dados"]["arduino"] = False

    dadosOutput["dados"]["potenciometro"] = int(arduinoInput["potenciometro"])
    dadosOutput["dados"]["temperatura"] = round(cpu.temperature, 1)
    dadosOutput["dados"]["ticks"] = tmp.setTicks()

    requests.post(URL, json=dadosOutput)

def erro():
    dadosOutput = dadosPost
    dadosOutput["dados"]["arduino"] = False
    dadosOutput["dados"]["temperatura"] = round(cpu.temperature, 1)
    dadosOutput["dados"]["ticks"] = tmp.setTicks()

    requests.post(URL, json=dadosOutput)
    
# ========= LOOP ========

try:
    while True:
        try:
            main()
        except (KeyboardInterrupt, SystemExit):
            raise
        except:
            print("Erro")
            erro()

except (KeyboardInterrupt, SystemExit):
    print('Encerrando o programa')
