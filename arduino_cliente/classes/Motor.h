#ifndef MOTOR_H
#define MOTOR_H

#include <Arduino.h>

class Motor
{
public:
  Motor(unsigned int pinA, unsigned int pinB);
  void run(unsigned int pwmA, unsigned int pwmB);

private:
  unsigned int pinoA, pinoB;
};

Motor::Motor(unsigned int pinA, unsigned int pinB)
{
  pinMode(pinA, OUTPUT);
  pinMode(pinB, OUTPUT);

  pinoA = pinA;
  pinoB = pinB;
}

void Motor::run(unsigned int pwmA, unsigned int pwmB)
{
  analogWrite(pinoA, pwmA);
  analogWrite(pinoB, pwmB);
}

#endif