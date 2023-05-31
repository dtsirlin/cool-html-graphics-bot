import pathlib as pl
import os
import secrets
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--kiosk')
chrome_options.add_experimental_option(
    "excludeSwitches", ["enable-automation"])

defaultDirectory = str(pl.Path().resolve()) + '/htmls'

def getParameters():
    return getDirectory(), getLoopCount(), getLoopTime()

def getDirectory():
    userInput = input(str(
        f'Enter a path for the directory of files (leave blank for default of {defaultDirectory}): '))

    if not userInput:
        directory = defaultDirectory
    else:
        directory = userInput

    if os.path.isdir(directory):
        return directory
    else:
        raise Exception('File doesn\'t exist.')

def getLoopCount():
    userInput = input('How many images do you want to view?: ')

    try:
        userInput = int(userInput)

        if userInput > 0:
            return userInput
        else:
            raise Exception('Value must be positive.')
    except:
        raise Exception('Value must be integer.')

def getLoopTime():
    userInput = input('How many second do you want to view each image for?: ')

    try:
        userInput = int(userInput)

        if userInput > 0:
            return userInput
        else:
            raise Exception('Value must be positive.')
    except:
        raise Exception('Value must be integer.')

def getFiles(parentDirectory):
    print('Reading files from:', parentDirectory)
    return os.listdir(parentDirectory)

def getSortedFiles(parentDirectory):
    return sorted(getFiles(parentDirectory))

# remove files without html extension from files list
def getHTMLFiles(unfilteredFiles):
    outputFilesList = []

    for file in unfilteredFiles:
        if len(file) >= 5:
            if file.endswith('.html'):
                outputFilesList.append(file)

    return outputFilesList

def runLoop(files, loopCount, loopTime, directoryPath):
    chromedriver = webdriver.Chrome(
        str(pl.Path().resolve()) + '/chromedriver', chrome_options=chrome_options)

    i = 0

    while i < loopCount:
        file = secrets.SystemRandom().choice(files)
        print(f'Iteration {i}: Filename: {file}')
        openURL(chromedriver, 'file://' + directoryPath + '/' + file)
        i += 1
        time.sleep(loopTime)

def openURL(chromedriver, url):
    chromedriver.get(url)

if __name__ == '__main__':
    print('Starting...\n')
    inputValues = getParameters()
    directoryPath = inputValues[0]
    loopCount = inputValues[1]
    loopTime = inputValues[2]

    files = getSortedFiles(directoryPath)
    cleanedFiles = getHTMLFiles(files)

    runLoop(cleanedFiles, loopCount, loopTime, directoryPath)
    print('\nExiting...')