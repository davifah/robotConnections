#include <ArduinoJson.h>

const int led = 7;
const int red = 9;
int i = 0;

// ============ Funções de tempo ==========

const int ticks = 60;

typedef struct t {
    unsigned long tStart;
    unsigned long tTimeout;
};

t t_main = {0, 1000/ticks};

bool tCheck (struct t *t ) {
  if (millis() > t->tStart + t->tTimeout) return true; else return false;    
}

void tRun (struct t *t) {
    t->tStart = millis();
}

// ============== Funções normais ==========

void setup() {
  pinMode(led,OUTPUT);
  pinMode(red,OUTPUT);
  Serial.begin(115200);
  Serial1.begin(115200);
  digitalWrite(red,HIGH);
  Serial.println("Iniciando...");
}

void loop() {
    if (tCheck(&t_main)) {
      _main();
      tRun(&t_main);
    }
}

//const char* input = "{\"RTrigger\": 1000}";

void _main(void){
  if (Serial1.available()){

    digitalWrite(red,LOW);

    String input = Serial1.readStringUntil('\n');
    
    StaticJsonDocument<500> doc;
    DeserializationError jsonErro = deserializeJson(doc, input);

    if (jsonErro){
      Serial.print("Erro: ");
      Serial.println(jsonErro.c_str());
      Serial.println(input);
    }else{
      int RTrigger = doc["RTrigger"];
      Serial.println(RTrigger);

      analogWrite(led,map(RTrigger,0,1000,0,255));
    }

  }else{

    digitalWrite(red,HIGH);

  }
}
