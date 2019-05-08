#ifndef ACELEROMETRO_H
#define ACELEROMETRO_H

#include <Arduino.h>
#include <Wire.h>
#include <MPU6050.h>

class Acelerometro
{
  private:
    MPU6050 mpu;

  public:
    Acelerometro();
    void get();
};

Acelerometro::Acelerometro()
{
    
}

void Acelerometro::get()
{
}

#endif