#ifndef MOTOR_H
#define MOTOR_H

#include <Arduino.h>

class Motor
{
  public:
    Motor(int pinA, int pinB);
    void run(int pwmA, int pwmB);

  private:
    int pinoA, pinoB;
};

#endif