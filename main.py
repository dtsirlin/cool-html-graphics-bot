import webbrowser as wb
import pathlib as pl

chrome_path = 'open -a /Applications/Google\ Chrome.app %s'

def openBrowser(url):
    wb.get('safari').open_new(url)
    return 

def openURL(url):
    return



if __name__ == "__main__":
    print("sup dog")
    openBrowser("file://" + str(pl.Path().resolve()) + "/htmls/1.html")
    # os.chdir(r"htmls")
    #openBrowser("http://www.google.com")
