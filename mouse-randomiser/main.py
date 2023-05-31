import pyautogui
import random
import time
import pynput

from pynput.keyboard import Key, Controller
keyboard = Controller()

x_min = -536
x_max = 2024
y_min = -1440
y_max = 0

pyautogui.PAUSE = 0

time.sleep(10)

pyautogui.leftClick(random.randint(x_min, x_max), random.randint(y_min, y_max))
time.sleep(1)
keyboard.press(Key.cmd)
keyboard.press(Key.shift)
keyboard.press('k')
keyboard.release(Key.cmd)
keyboard.release(Key.shift)
keyboard.release('k')

for i in range(20):
    xPos = random.randint(x_min, x_max)
    yPos = random.randint(y_min, y_max)
    duration = random.randint(1,3)

    print(f'Iteration {i}: moving to ({xPos},{yPos}) in {duration} seconds')

    pyautogui.moveTo(xPos, yPos, duration)