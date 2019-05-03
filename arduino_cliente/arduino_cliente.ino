#include <ArduinoJson.h>

#define poten A0
#define green 7
#define red 9
#define white 8
#define baudrate 115200
#define motorDa 12
#define motorDb 13

// ============== Função de configuração ==========

void setup()
{
	pinMode(motorDa, OUTPUT);
	pinMode(motorDb, OUTPUT);

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

		Serial.println(input);

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
			Serial.println(bool(doc["greenLED"]));
			digitalWrite(green, doc["greenLED"].as<bool>());
			analogWrite(white, doc["brightLED"].as<int>());

			analogWrite(motorDa, doc["motorD"]["a"].as<int>());
			analogWrite(motorDb, doc["motorD"]["b"].as<int>());
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