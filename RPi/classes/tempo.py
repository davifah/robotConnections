from time import time

class Tempo:
    def __init__(self):
        self.timeStart = time()
        self.lastTick = 0
        self.ticks = 0

    def setTicks(self):
        timestamp = time()
        if timestamp - self.timeStart >= 1.0:
            self.timeStart = timestamp
            self.lastTick = self.ticks
            self.ticks = 0
        else:
            self.ticks += 1
        return self.lastTick