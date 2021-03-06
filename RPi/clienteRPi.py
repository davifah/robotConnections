import requests
# biblioteca responsável por acessar o servidor web (2.18.4)
import serial
# biblioteca responsável por estabelecer a comunicaçao com o Arduino (3.4)
import json
from gpiozero import CPUTemperature
# biblioteca para monitorar temperatura da cpu
from classes.tempo import Tempo

# ============ Variáveis =============
URL = 'http://10.1.0.1:8080'
arduinoPort = '/dev/ttyS0'
usuario = 'RPi'
baudrate = 200000
server = True
arduino = True
serverErrorCounter = 0

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
    "temperatura": 0.00,
    "arduino": False,
    "potenciometro": None,
    "ticks": 0
}

# ========= Funções ============

def main():
    dadosOutput = dadosPost
    dados = requests.get(URL, params={'usuario': usuario}).json()

    ser.write(json.dumps(dados).encode('utf-8')+b'\x03')

    readSerial = ser.read_until().decode('utf-8')
    
    if(readSerial):
        dadosOutput["arduino"] = True
    else:
        dadosOutput["arduino"] = False

    try:
        arduinoInput = json.loads(readSerial) #json.decoder.JSONDecodeError
    except json.decoder.JSONDecodeError:
        dadosOutput["arduino"] = False

    dadosOutput["potenciometro"] = int(arduinoInput["potenciometro"])
    dadosOutput["temperatura"] = round(cpu.temperature, 1)
    dadosOutput["ticks"] = tmp.setTicks()

    requests.post(URL, json=dadosOutput)

def erro():
    dadosOutput = dadosPost
    dadosOutput["arduino"] = False
    dadosOutput["temperatura"] = round(cpu.temperature, 1)
    dadosOutput["ticks"] = tmp.setTicks()

    requests.post(URL, json=dadosOutput)
    
# ========= LOOP ========

try:
    while True:
        try:
            main()
        except (KeyboardInterrupt, SystemExit):
            raise
        except requests.exceptions.RequestException:
            if server:
                print("Erro na conexão com o servidor")
                server = False
        except:
            if arduino:
                print("Erro na conexão com o arduino")
                arduino = False
            erro()
        else:
            if not server:
                print("Servidor conectado")
                server = True
            if not arduino:
                print("Arduino conectado")
                arduino = True

except (KeyboardInterrupt, SystemExit):
    print("Encerrando o programa")
