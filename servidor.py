
# ====== Inicialização do servidor =======
import web
import json

urls = (
    '/(.*)', 'pyServer'
)

app = web.application(urls, globals())

# ============== Variáveis ===============

app.controleDados = None    # Inicializa uma variável global sem valor
app.arduinoDados = None

# ===== Classe de Serviço e funções ======

class pyServer:

	def GET(self, name):

        # As duas próximas linhas servem para garantir que qualquer cliente pode acessar o servidor
		web.header('Access-Control-Allow-Origin',      '*')
		web.header('Access-Control-Allow-Credentials', 'true')

		entrada = web.input()   #recebe os dados enviados pelo cliente

		print(entrada)

		if entrada["usuario"] == 'ui':
			pass
		elif entrada["usuario"] == 'RPi':
			return json.dumps(app.controleDados)

	def POST(self, name):

        # As duas próximas linhas servem para garantir que qualquer cliente pode acessar o servidor
		web.header('Access-Control-Allow-Origin',      '*')
		web.header('Access-Control-Allow-Credentials', 'true')

		dados = json.loads(web.data().decode('utf-8'))

		if dados["usuario"] == 'ui':
			app.controleDados = dados
			print (app.controleDados["RTrigger"])
			return None
		elif dados["usuario"] == 'RPi':
			return None


if __name__ == '__main__':
    app.run()

# ================= Funções ===================