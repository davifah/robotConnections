#include<ArduinoJson.h>

const int led = 7;
int i = 0;

// ============ Funções de tempo ==========

const int ticks = 1;

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
  Serial.begin(115200);
}

void loop() {
    if (tCheck(&t_main)) {
      _main();
      tRun(&t_main);
    }
}

void _main(void){
  StaticJsonDocument<256> doc;
  JsonObject input = deserializeJson(doc,Serial);
  
}
