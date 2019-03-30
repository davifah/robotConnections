#include <ArduinoJson.h>

const int led = 7;
const int red = 9;
int i = 0;

// ============ Funções de tempo ==========

const int ticks = 10;

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
    
/*    String input = Serial1.readString();
    if (!input)
      digitalWrite(led,HIGH);*/

    StaticJsonDocument<500> doc;
    DeserializationError jsonErro = deserializeJson(doc, Serial1);

    int RTrigger = doc["RTrigger"];

    analogWrite(led,map(RTrigger,0,1000,0,255));

  }else{

    digitalWrite(red,HIGH);
    digitalWrite(led,LOW);

  }
}
