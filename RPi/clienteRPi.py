import requests
    #biblioteca responsável por acessar o servidor web (2.18.4)
from apscheduler.schedulers.background import BackgroundScheduler
    #biblioteca responsável por rodar a função principal (3.6)
import serial
    #biblioteca responsável por estabelecer a comunicaçao com o Arduino (3.4)
import json

# ============ Variáveis =============
ticks = 60
URL = 'http://192.168.0.17:8080'
arduinoPort = '/dev/ttyS0'
usuario = 'RPi'
baudrate = 500000

# ========= Função Background ========
def main():

    dados = json.loads(requests.get( URL, params= {'usuario': usuario}).content.decode('utf-8'))
#    print(json.dumps(dados).encode('utf-8'))
    ser.write(json.dumps(dados).encode('utf-8')+'\x03')

# ======= Criação de loop de intervalo

if __name__ == '__main__':

    # =========== Instâncias =========
    ser = serial.Serial( arduinoPort, baudrate )
        #cria uma instância para porta serial
    sched = BackgroundScheduler({'apscheduler.job_defaults.max_instances': '20'})
        #cria uma instância para loop de intervalo
    sched.add_job(main, 'interval', seconds=1/ticks)
    sched.start()

    # =========== Comandos "setup" =====
    try:
        while True:
            pass

    except (KeyboardInterrupt, SystemExit):
        sched.shutdown()
