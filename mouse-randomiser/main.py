import pyautogui
import random
import time

from pynput.keyboard import Key, Controller
keyboard = Controller()

# set these values to the corner of the screen
# use position.py to find position of cursor on screen
xMin = -536
xMax = 2023
yMin = -1440
yMax = 0

pyautogui.PAUSE = 0

def getParameters():
    return getDuration(), getStartSleep()

def getDuration(): 
    userInput = input('How many seconds do you want to have the mouse move for?: ')

    try:
        userInput = int(userInput)

        if userInput > 0:
            return userInput
        else:
            raise Exception('Value must be positive.')
    except:
        raise Exception('Value must be integer.')

def getStartSleep():
    userInput = input('How many seconds do you want to wait until mouse movement starts?: ')

    try:
        userInput = int(userInput)

        if userInput >= 0:
            return userInput
        else:
            raise Exception('Value must be positive.')
    except:
        raise Exception('Value must be integer.')

def moveMouse(duration):
    initialiseMouse()

    for i in range(duration // 2):
        xPos = random.randint(xMin, xMax)
        yPos = random.randint(yMin, yMax)
        iterationDuration = random.randint(1,3)

        if iterationDuration == 1:
            print(f'Iteration {i}: moving to ({xPos},{yPos}) in {iterationDuration} second')
        else:
            print(f'Iteration {i}: moving to ({xPos},{yPos}) in {iterationDuration} seconds')

        pyautogui.moveTo(xPos, yPos, iterationDuration)

# prepare for interaction with htmls by clicking mouse and hiding it
# 
# assumption: chrome window with htmls is already open as clicking has to happen on this window
def initialiseMouse():
    pyautogui.leftClick(random.randint(xMin, xMax), random.randint(yMin, yMax))
    time.sleep(1)
    toggleCursor()

def toggleCursor():
    keyboard.press(Key.cmd)
    keyboard.press(Key.shift)
    keyboard.press('k')
    keyboard.release(Key.cmd)
    keyboard.release(Key.shift)
    keyboard.release('k')

def refineMouseLimits():
    global xMin
    global xMax
    global yMin
    global yMax

    # avoid corners of screen for aesthetic purposes
    #
    # this also ensures cursor doesn't get too close to the top of the screen as
    # a system menu (app window with close/minimise/go full screen options) appears
    # and this unhides cursor
    xBuffer = abs(xMin - xMax) // 10
    yBuffer = abs(yMin - yMax) // 10

    xMin = xMin + xBuffer
    xMax = xMax - xBuffer
    
    yMin = yMin + yBuffer
    yMax = yMax - yBuffer

    # avoid getting cursor too close to top of full screen app as cursor
    # being over system menu seems to unhide it
    #
    # if top corner of screen has position of 0, then x% of it is still 0,
    # so set absolute value

    # if yMin == 0:
    #     yMin = 100
    # else:
    #     yMin = yMin // 10 * 9

    # yMax = yMax // 10 * 9

if __name__ == '__main__':
    print('Starting...\n')
    print('If not have not yet set min and max position for x and y axis or hotkey to hide cursor, exit this by pressing Ctrl + C and set them in the script.\n')

    inputValues = getParameters()

    duration = inputValues[0]
    startSleep = inputValues[1]

    print(f'\nSleeping {startSleep} seconds...')
    time.sleep(startSleep)

    refineMouseLimits()
    
    print('\nStarting mouse movement...')
    moveMouse(duration)

    toggleCursor()

    print('\nExiting...')