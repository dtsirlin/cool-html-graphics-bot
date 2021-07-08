import webbrowser as wb
import pathlib as pl
import os
import secrets

defaultDirectory = str(pl.Path().resolve()) + '/htmls'

def getParameters():
    return getDirectory(), getLoopCount(), getLoopTime()

def getDirectory():
    userInput = input (str('Enter a path for the directory of files (leave blank for default of ' + defaultDirectory + '): '))
    
    if not userInput:
        directory = defaultDirectory
    else:
        directory = userInput

    if os.path.isdir(directory):
        return directory
    else:
        raise Exception('File doesn\'t exist.')

def getLoopCount():
    userInput = input ('How many images do you want to view?: ')

    try:
        userInput = int(userInput)

        if userInput > 0:
            return userInput
        else:
            raise Exception('Value must be positive.')
    except:
        raise Exception('Value must be integer.')

def getLoopTime():
    userInput = input ('How many second do you want to view each image for?: ')

    try:
        userInput = int(userInput)

        if userInput > 0:
            return userInput
        else:
            raise Exception('Value must be positive.')
    except:
        raise Exception('Value must be integer.')

def openURL(url):
    wb.get('safari').open_new(url)
    return 

def getFiles(parentDirectory):
    print('Reading files from:',parentDirectory)
    return os.listdir(parentDirectory)

def getSortedFiles(parentDirectory):
    return sorted(getFiles(parentDirectory))

def runLoop(files, loopCount, loopTime):
    i = 0

    while i < loopCount:
        file = secrets.SystemRandom().choice(files)
        print('Iteration:',i,'Filename:',file)
        openURL('file://' + str(pl.Path().resolve()) + file)
        i += 1

if __name__ == '__main__':
    print('Starting...\n')
    inputValues = getParameters()
    filePath = inputValues[0]
    loopCount = inputValues[1]
    loopTime = inputValues[2]

    files = getSortedFiles(filePath)
    
    runLoop(files, loopCount, loopTime)
    print('\nExiting...')
