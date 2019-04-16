#include <ArduinoJson.h>

#define poten A0
#define led 7
#define red 9
#define baudrate 500000

// ============== Função de configuração ==========

void setup()
{
	pinMode(poten, INPUT);
	pinMode(led, OUTPUT);
	pinMode(red, OUTPUT);
	Serial.begin(115200);
	Serial1.begin(baudrate);
	digitalWrite(red, HIGH);
	Serial.println("Iniciando...");
}

// ============= Variaveis Globais ===============

// ============== Função de loop =================

void loop()
{
	if (Serial1.available())
	{

		digitalWrite(red, LOW);

		StaticJsonDocument<500> doc;
		DeserializationError jsonErro = deserializeJson(doc, Serial1.readStringUntil('\x03'));

		if (jsonErro)
		{
			Serial.print("Erro: ");
			Serial.print(jsonErro.c_str());
		}
		else
		{
			int RTrigger = doc["controle"]["triggers"]["left"];
			Serial.println(RTrigger);

			analogWrite(led, map(RTrigger, 0, 1000, 0, 255));
		}

		doc.clear();

		doc["potenciometro"] = analogRead(poten);
		serializeJson(doc, Serial1);
	}
	else
	{

		digitalWrite(red, HIGH);
	}
}
