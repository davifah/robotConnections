import requests
# biblioteca responsável por acessar o servidor web (2.18.4)
from apscheduler.schedulers.background import BackgroundScheduler
# biblioteca responsável por rodar a função principal (3.6)
import serial
# biblioteca responsável por estabelecer a comunicaçao com o Arduino (3.4)
import json
from gpiozero import CPUTemperature
# biblioteca para monitorar temperatura da cpu

# ============ Variáveis =============
ticks = 7
URL = 'http://192.168.0.17:8080'
arduinoPort = '/dev/ttyS0'
usuario = 'RPi'
baudrate = 200000

# ========= Função Background ========


def main():
    dadosOutput = dadosPost
    dados = requests.get(URL, params={'usuario': usuario}).json()

    ser.write(json.dumps(dados).encode('utf-8')+b'\x03')

    readSerial = ser.read_until().decode('utf-8')
    if(readSerial):
        dadosOutput["dados"]["arduino"] = True
    else:
        dadosOutput["dados"]["arduino"] = False

    arduinoInput = json.loads(readSerial) #json.decoder.JSONDecodeError

    dadosOutput["dados"]["potenciometro"] = int(arduinoInput["potenciometro"])

    dadosOutput["dados"]["temperatura"] = round(cpu.temperature, 1)

    requests.post(URL, json=dadosOutput)

# ======= Criação de loop de intervalo


if __name__ == '__main__':

    # =========== Instâncias =========
    ser = serial.Serial(
        port=arduinoPort,
        baudrate=baudrate,
        timeout=2/ticks
    )
    # cria uma instância para porta serial
    sched = BackgroundScheduler(
        {'apscheduler.job_defaults.max_instances': '10'})
    # cria uma instância para loop de intervalo
    cpu = CPUTemperature()
    sched.add_job(main, 'interval', seconds=1/ticks)
    sched.start()

    dadosPost = {
        "usuario": usuario,
        "dados": {
            "temperatura": 0.00,
            "arduino": False,
            "potenciometro": None,
        }
    }

    # =========== Comandos "setup" =====
    try:
        while True:
            pass

    except (KeyboardInterrupt, SystemExit):
        sched.shutdown()
