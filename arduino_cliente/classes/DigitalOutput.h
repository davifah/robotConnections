#ifndef DIGITALOUTPUT_H
#define DIGITALOUTPUT_H

#include <Arduino.h>

class DigitalOutput
{
private:
  unsigned int pino;

public:
  DigitalOutput(unsigned int pin);
  void set(bool sinal);
};

DigitalOutput::DigitalOutput(unsigned int pin)
{
  pinMode(pin, OUTPUT);
  pino = pin;
}

void DigitalOutput::set(bool sinal)
{
  digitalWrite(pino, sinal);
}

#endif