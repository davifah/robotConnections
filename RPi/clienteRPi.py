import requests
    #biblioteca responsável por acessar o servidor web (2.18.4)
from apscheduler.schedulers.blocking import BlockingScheduler
    #biblioteca responsável por rodar a função principal (3.6)
import serial
    #biblioteca responsável por estabelecer a comunicaçao com o Arduino (3.4)
import json

# ============ Variáveis =============
ticks = 60
URL = 'http://127.0.0.1:8080'
arduinoPort = '/dev/ttyACM0'
usuario = 'RPi'

#ser = serial.Serial( arduinoPort, 115200 )  #cria uma instância para porta serial
sched = BlockingScheduler()                 #cria uma instância para loop de intervalo

# ========= Função Principal ========
def main():

    dados = json.loads(requests.get( URL, params= {'usuario': usuario}).content.decode('utf-8'))
    print(type(dados['RTrigger']))
    print(float(dados['RTrigger']))

sched.add_job(main, 'interval', seconds=1/ticks)

sched.start()