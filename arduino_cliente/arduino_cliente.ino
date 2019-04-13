#include <ArduinoJson.h>

const unsigned int led = 7;
const unsigned int red = 9;
const unsigned int baudrate = 500000

// ============== Função de configuração ==========

void setup() {
  pinMode(led,OUTPUT);
  pinMode(red,OUTPUT);
  Serial.begin(115200);
  Serial1.begin(baudrate);
  digitalWrite(red,HIGH);
  Serial.println("Iniciando...");
}

// ============== Função de loop =================

void loop(){
  if (Serial1.available()){

    digitalWrite(red,LOW);
    
    StaticJsonDocument<500> doc;
      //adicionar o Serial1.readStringUntil() ao deserializeJson para salvar memoria e testar
    DeserializationError jsonErro = deserializeJson(doc, Serial1.readStringUntil('\x03'));

    if (jsonErro){
      Serial.print("Erro: ");
      Serial.println(jsonErro.c_str());
      Serial.println(doc);
    }else{
      int RTrigger = doc["controle"]["triggers"]["left"];
      Serial.println(RTrigger);

      analogWrite(led,map(RTrigger,0,1000,0,255));
    }

  }else{

    digitalWrite(red,HIGH);

  }
}
