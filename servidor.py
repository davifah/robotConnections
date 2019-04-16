
# ====== Inicialização do servidor =======
import web
import json

urls = (
    '/(.*)', 'pyServer'
)

app = web.application(urls, globals())

# ============== Variáveis ===============

app.uiData = None    # Inicializa uma variável global sem valor
app.RPiData = {
    "connected": False,
    "dados": None
}
app.RPiConnection = 0
app.timeout = 30

# ===== Classe de Serviço e funções ======


class pyServer:

    def GET(self, name):

        # As duas próximas linhas servem para garantir que qualquer cliente pode acessar o servidor
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')

        entrada = web.input()  # recebe os dados enviados pelo cliente

        print(entrada)

        if entrada["usuario"] == 'ui':
            if app.RPiConnection >= app.timeout:
                app.RPiData["connected"] = False
            return json.dumps(app.RPiData)

        elif entrada["usuario"] == 'RPi':
            return json.dumps(app.uiData)

    def POST(self, name):

        # As duas próximas linhas servem para garantir que qualquer cliente pode acessar o servidor
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')

        dados = json.loads(web.data().decode('utf-8'))

        if dados["usuario"] == 'ui':
            app.RPiConnection += 1
            app.uiData = dados
            return None

        elif dados["usuario"] == 'RPi':
            app.RPiConnection = 0
            app.RPiData["dados"] = dados
            app.RPiData["connected"] = True
            return None


if __name__ == '__main__':
    app.run()

# ================= Funções ===================
