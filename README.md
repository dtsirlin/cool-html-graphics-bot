# cool-html-graphics-bot
Opens a list of html files that render cool graphics in Google Chrome on loop with optional randomised mouse movement for interaction with some of the graphics.

Cool graphics thanks to [Chris Shier](https://csh.bz/).

## Graphics only
If you only want to render the graphics, go to [html-looper](./html-looper).

## Graphics and mouse movement
If you also want to have randomised mouse movement, go to [mouse-randomiser](/mouse-randomiser) for this.

> :warning: Mouse movement out of the box only supports macOS due to it supporting

## Preparation
Install the following python packages before running the scripts by executing these commands in a terminal window:
```bash
pip3 install selenium
pip3 install pyautogui
pip3 install pynput
```

> :information_source: If you don't have `pip`, Google how to install it. Get Python 3 too as I'm not sure if the code works without any changes with Python 2.