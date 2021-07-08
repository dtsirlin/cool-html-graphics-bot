import webbrowser as wb
import pathlib as pl
import os
import secrets

def openURL(url):
    wb.get('safari').open_new(url)
    return 

def getFiles(parentDirectory):
    print('Reading files from:',parentDirectory)
    return os.listdir(parentDirectory)

def sortedFiles(parentDirectory):
    return sorted(getFiles(parentDirectory))

if __name__ == '__main__':
    print('starting')
    files = sortedFiles(str(pl.Path().resolve()) + '/htmls')
    print(files)
    # print(secrets.SystemRandom().choice(files))
    print('finishing')
    # openURL('file://' + str(pl.Path().resolve()) + '/htmls/1.html')
