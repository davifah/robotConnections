#include <ArduinoJson.h>

#define poten A0
#define green 31
#define red 9
#define white 7
#define baudrate 200000
#define motorDa 1
#define motorDb 2

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
			Serial.println(doc["brightLED"]);
			digitalWrite(green, doc["greenLED"]);
			analogWrite(white, doc["brightLED"]);

			analogWrite(motorDa, doc["motor"]["a"]);
			analogWrite(motorDb, doc["motor"]["b"]);
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