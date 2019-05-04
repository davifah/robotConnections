#ifndef ACELEROMETRO_H
#define ACELEROMETRO_H

#include <Arduino.h>

class Acelerometro
{
  private:
    unsigned int pinX, pinY, pinZ;
    unsigned int *valX, *valY, *valZ;

  public:
    Acelerometro(unsigned int x, unsigned int y, unsigned int z, unsigned int *vX, unsigned int *vY, unsigned int *vZ);
    void get();
};

Acelerometro::Acelerometro(unsigned int x, unsigned int y, unsigned int z, unsigned int *vX, unsigned int *vY, unsigned int *vZ)
{
    pinX = x;
    pinY = y;
    pinZ = z;

    valX = vX;
    valY = vY;
    valZ = vZ;
}

void Acelerometro::get()
{
    *valX = analogRead(pinX);
    *valY = analogRead(pinY);
    *valZ = analogRead(pinZ);
}

#endif