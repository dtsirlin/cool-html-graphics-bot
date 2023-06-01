# html-looper
Opens a list of html files that render cool graphics in Google Chrome on loop.

## Usage
1. Set current directory in your terminal window to be this directory, `html-looper`, not the repo root directory
2. Execute command `python3 main.py`
3. Follow the prompts in your terminal window

> :information_source If you are also randomising mouse movement, you need to start that script before this one.
> 
> There will be 3 prompts in your terminal window once you execute `main.py` for `html-looper` before the Chrome window opens. Once the Chrome window opens, you won't want to exit it.
> 
> Therefore, before you submit your response for the 3rd prompt for `html-looper`, have `mouse-randomiser` running with enough of a start delay (more info in its own [documentation](../mouse-randomiser/README.md#usage)) for you to start `html-looper`.

## Troubleshooting
### Browser open on wrong display
This can be a struggle to do if you have multiple monitors.

From my experience, the display that you have your terminal window on when executing the run command is the one where the chrome window will open.

### Chromedriver
It is possible that this may break due to `chromedriver` version not matching your Chrome browser.

To fix this:
1. Go to [ChromeDriver downloads](https://chromedriver.chromium.org/downloads)
2. Download the version that matches your Chrome version
3. Replace the file `chromedriver` in this directory with the downloaded one