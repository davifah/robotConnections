#include <ArduinoJson.h>
#include "classes/Motor.h"
#include "classes/Sharp.h"
//#include "classes/Acelerometro.h"
#include "classes/Sharp.h"
#include "classes/DigitalOutput.h"

#define poten A0
#define red 9

#define baudrate 200000

#define motorDa 12
#define motorDb 11

#define COOLER_PINO 2
#define sharpPin A0

// ============= Variaveis Globais ===============

unsigned int acX, acY, acZ;

// ========== Instanciações ================

Motor direito(motorDa, motorDb);
Sharp sharp(sharpPin);
DigitalOutput cooler(COOLER_PINO);
//Acelerometro ac();

// ============== Função de configuração ==========

void setup()
{
	pinMode(poten, INPUT);
	pinMode(red, OUTPUT);
	Serial.begin(115200);
	Serial1.begin(baudrate);
	Serial.println("Iniciando...");
}

// ============== Função de loop =================

void loop()
{
	if (Serial1.available())
	{

		digitalWrite(red, HIGH);

		String input = Serial1.readStringUntil('\x03');

//		Serial.println(input);

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
			direito.run(doc["motorD"]["a"].as<int>(), doc["motorD"]["b"].as<int>());
			cooler.set(doc["status"]["cooler"].as<bool>());
		}

		doc.clear();
		String output;

		doc["potenciometro"] = analogRead(poten);
		serializeJson(doc, output);

		Serial1.print(output + '\n');
	}
	else
	{
		digitalWrite(red, LOW);
	}
}