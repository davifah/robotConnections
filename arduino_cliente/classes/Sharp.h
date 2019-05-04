#ifndef SHARP_H
#define SHARP_H

#include <Arduino.h>

class Sharp
{
  public:
	Sharp(unsigned int pin);
	unsigned int get();

  private:
	unsigned int pino;
};

Sharp::Sharp(unsigned int pin)
{
	pinMode(pin, INPUT);
	pino = pin;
}

unsigned int Sharp::get()
{
	return 26 * pow(analogRead(pino) * (5 / 1024), -1);
}

#endif