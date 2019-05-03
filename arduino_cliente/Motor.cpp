#include "Motor.h"

Motor::Motor(int pinA, int pinB)
{
    pinMode(pinA, OUTPUT);
    pinMode(pinB, OUTPUT);

    pinoA = pinA;
    pinoB = pinB;
}

void Motor::run(int pwmA, int pwmB)
{
    analogWrite(pinoA, pwmA);
    analogWrite(pinoB, pwmB);
}