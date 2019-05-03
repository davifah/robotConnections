#include <ArduinoJson.h>

#define poten A0
#define green 7
#define red 8
#define white 9
#define baudrate 200000

// ============== Função de configuração ==========

void setup()
{
	pinMode(poten, INPUT);
	pinMode(green, OUTPUT);
	pinMode(white, OUTPUT);
	pinMode(red, OUTPUT);
	Serial.begin(115200);
	Serial1.begin(baudrate);
	Serial.println("Iniciando...");
}

// ============= Variaveis Globais ===============

// ============== Função de loop =================

void loop()
{
	if (Serial1.available())
	{

		digitalWrite(red, HIGH);

		String input = Serial1.readStringUntil('\x03');

		StaticJsonDocument<500> doc;
		DeserializationError jsonErro = deserializeJson(doc, input);

		if (jsonErro)
		{
			Serial.print("Erro: ");
			Serial.print(jsonErro.c_str());
			Serial.println(input);
		}
		else
		{
			int RTrigger = doc["controle"]["triggers"]["left"];
			bool Xled = doc["controle"]["buttons"]["cross"];
			Serial.println(RTrigger);

			digitalWrite(green, Xled);
			analogWrite(white, map(RTrigger, 0, 1000, 0, 255));
		}

		doc.clear();
		String output;

		doc["potenciometro"] = analogRead(poten);
		serializeJson(doc, output);

		Serial1.print(output + '\n');
		Serial.println(output);
	}
	else
	{
		digitalWrite(red, LOW);
	}
}
