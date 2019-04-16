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
ticks = 10
URL = 'http://192.168.0.17:8080'
arduinoPort = '/dev/ttyS0'
usuario = 'RPi'
baudrate = 500000

# ========= Função Background ========


def main():
    dadosOutput = dadosPost
    dados = requests.get(URL, params={'usuario': usuario}).json()

    ser.write(json.dumps(dados).encode('utf-8')+b'\x03')

    if (ser.in_waiting and dadosOutput["dados"]["arduino"]):
        arduinoInput = json.loads(ser.read())
        dadosOutput["dados"]["potenciometro"] = int(
            arduinoInput["potenciometro"])
    else:
        dadosOutput["dados"]["arduino"] = False

    dadosOutput["dados"]["temperatura"] = round(cpu.temperature)

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
