// Generated by CoffeeScript 1.6.2
(function() {
  'use strict';
  var Configuration, Follower, Square, animloop, canvas, config, ctx, hsla, imageSmoothing, paintFollowers, pre_canvas, pre_ctx, pre_decay, rotateTo, showBlendMode, sizePre, spread, squares, symmetry, tilt, timeInc;

  Math.radToDeg = function(rad) {
    return rad / (Math.PI / 180);
  };

  Math.degToRad = function(deg) {
    return deg * (Math.PI / 180);
  };

  Math.hyp = function(a, b) {
    if (a == null) {
      a = 0;
    }
    if (b == null) {
      b = 0;
    }
    return Math.sqrt(a * a + b * b);
  };

  (function() {
    var i, lastTime, vendors, w, _i, _ref;

    w = window;
    lastTime = 0;
    vendors = ['webkit', 'moz'];
    if (!w.requestAnimationFrame) {
      for (i = _i = 0, _ref = vendors.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        w.requestAnimationFrame = w["" + vendors[i] + "RequestAnimationFrame"];
        w.cancelAnimationFrame = w["" + vendors[i] + "CancelAnimationFrame"] || w["" + vendors[i] + "CancelRequestAnimationFrame"];
      }
    }
    if (!w.requestAnimationFrame) {
      w.requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall;

        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = w.setTimeout(function() {
          return callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!w.cancelAnimationFrame) {
      return w.cancelAnimationFrame = function(id) {
        return clearTimeout(id);
      };
    }
  })();

  canvas = document.getElementById('canvas');

  ctx = canvas.getContext('2d');

  canvas.getWindowSize = function() {
    var d, e, g, w;

    w = window;
    d = document;
    e = d.documentElement;
    g = d.getElementsByTagName('body')[0];
    this.width = w.innerWidth || e.clientWidth || g.clientWidth;
    this.height = w.innerHeight || e.clientHeight || g.clientHeight;
    this.min = Math.min(this.width, this.height);
    return this.max = Math.max(this.width, this.height);
  };

  canvas.sizeCanvas = function(w, h) {
    if (w == null) {
      w = canvas.width;
    }
    if (h == null) {
      h = canvas.height;
    }
    this.setAttribute('width', w);
    this.setAttribute('height', h);
    this.top = -this.height / 2;
    this.left = -this.width / 2;
    this.right = this.width / 2;
    this.bottom = this.height / 2;
    ctx.restore();
    ctx.translate(w / 2, h / 2);
    return ctx.save();
  };

  canvas.getWindowSize();

  canvas.sizeCanvas(canvas.width, canvas.height);

  pre_canvas = document.createElement('canvas');

  pre_ctx = pre_canvas.getContext('2d');

  (sizePre = function() {
    pre_canvas.width = Math.hyp(canvas.height, canvas.width);
    return pre_canvas.height = Math.hyp(canvas.height, canvas.width);
  })();

  canvas.windowGotResized = function() {
    var canvasCopy, contextCopy, oh, ow;

    ctx.save();
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ow = canvas.width;
    oh = canvas.height;
    canvasCopy = document.createElement('canvas');
    contextCopy = canvasCopy.getContext('2d');
    canvasCopy.setAttribute('width', ow);
    canvasCopy.setAttribute('height', oh);
    contextCopy.drawImage(canvas, 0, 0);
    canvas.getWindowSize();
    canvas.sizeCanvas(canvas.width, canvas.height);
    ctx.drawImage(canvasCopy, 0, 0, ow, oh, canvas.left, canvas.top, canvas.width, canvas.height);
    ctx.restore();
    return sizePre();
  };

  window.addEventListener('resize', canvas.windowGotResized, false);

  window.addEventListener('orientationchange', canvas.windowGotResized, false);

  ctx.imageSmoothing = function(a) {
    if (a == null) {
      a = false;
    }
    ctx.webkitImageSmoothingEnabled = a;
    ctx.mozImageSmoothingEnabled = a;
    return ctx.imageSmoothingEnabled = a;
  };

  imageSmoothing = function(context, a) {
    if (context == null) {
      context = ctx;
    }
    if (a == null) {
      a = false;
    }
    context.webkitImageSmoothingEnabled = a;
    context.mozImageSmoothingEnabled = a;
    return context.imageSmoothingEnabled = a;
  };

  window.Mouse = {
    x: 0,
    y: 0,
    xs: 0,
    ys: 0,
    up: true,
    down: false,
    clicks: 0,
    events: {},
    points: [],
    smooth: []
  };

  Mouse.events.move = function(e) {
    var mpl;

    if ('touches' in e) {
      e.preventDefault();
      e = e.touches[0];
    }
    if (e.pageX === Mouse.x && e.pageY === Mouse.y) {
      return;
    }
    Mouse.x = Math.round(e.pageX - canvas.right);
    Mouse.y = Math.round(e.pageY - canvas.bottom);
    Mouse.points.push({
      x: Mouse.x,
      y: Mouse.y
    });
    if (Mouse.points.length > 2) {
      mpl = Mouse.points.length;
      Mouse.smooth.push({
        x: (Mouse.points[mpl - 1].x + Mouse.points[mpl - 2].x) * 0.5,
        y: (Mouse.points[mpl - 1].y + Mouse.points[mpl - 2].y) * 0.5
      });
      Mouse.xs = Mouse.smooth[Mouse.smooth.length - 1].x;
      Mouse.ys = Mouse.smooth[Mouse.smooth.length - 1].y;
      if (Mouse.points.length > 50) {
        Mouse.points.shift();
        Mouse.smooth.shift();
      }
      if (Mouse.down) {
        return clickPaths[clickPaths.length - 1].points.push({
          x: Mouse.xs,
          y: Mouse.ys
        });
      }
    }
  };

  window.clickPaths = [];

  Mouse.events.up = function() {
    Mouse.up = true;
    Mouse.down = !Mouse.down;
    if (clickPaths.length > 64) {
      return clickPaths.shift();
    }
  };

  Mouse.events.down = function() {
    Mouse.down = true;
    Mouse.up = !Mouse.down;
    clickPaths.push([]);
    clickPaths[clickPaths.length - 1].points = [];
    clickPaths[clickPaths.length - 1].index = Mouse.clicks;
    clickPaths[clickPaths.length - 1].points.push({
      x: Mouse.xs,
      y: Mouse.ys
    });
    return Mouse.clicks += 1;
  };

  document.addEventListener('mousemove', Mouse.events.move, false);

  document.addEventListener('touchmove', Mouse.events.move, false);

  document.addEventListener('mousedown', Mouse.events.down, false);

  document.addEventListener('touchstart', Mouse.events.down, false);

  document.addEventListener('touchend', Mouse.events.up, false);

  document.addEventListener('mouseup', Mouse.events.up, false);

  ctx.drawText = function(string, x, y) {
    if (string == null) {
      string = "foo";
    }
    if (x == null) {
      x = 10;
    }
    if (y == null) {
      y = 10;
    }
    ctx.strokeWidth = 200;
    ctx.strokeStyle = "black";
    ctx.strokeText(string, x, y);
    ctx.fillStyle = "white";
    return ctx.fillText(string, x, y);
  };

  ctx.clear = function() {
    return ctx.clearRect(canvas.left, canvas.top, canvas.width, canvas.height);
  };

  hsla = function(h, s, l, a) {
    if (h == null) {
      h = 0;
    }
    if (s == null) {
      s = 100;
    }
    if (l == null) {
      l = 50;
    }
    if (a == null) {
      a = 1;
    }
    return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
  };

  rotateTo = function(rise, run) {
    var rotation, slope, tangent;

    if (rise == null) {
      rise = 0;
    }
    if (run == null) {
      run = 0;
    }
    if (run === 0) {
      run = 1;
    }
    slope = rise / run;
    tangent = Math.radToDeg(Math.atan(slope));
    if (run < 0) {
      rotation = Math.degToRad(tangent - 180);
    } else {
      rotation = Math.degToRad(tangent);
    }
    return rotation;
  };

  timeInc = function(rate) {
    if (rate == null) {
      rate = 1;
    }
    return Date.now() * (1 / rate);
  };

  Square = (function() {
    function Square(index, x, y) {
      this.index = index;
      this.x = x;
      this.y = y;
    }

    Square.prototype.age = 0;

    Square.prototype.draw = function() {
      var baseSize, circSize, endAngle, height, i, shrunkSize, size, startAngle;

      i = this.index;
      size = Math.hyp(canvas.height, canvas.width) / 14;
      baseSize = size / Math.PI;
      shrunkSize = Math.hyp(Mouse.xs - this.x, Mouse.ys - this.y);
      circSize = Math.min(baseSize, shrunkSize);
      startAngle = Math.degToRad(0);
      endAngle = Math.degToRad(180);
      height = circSize;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(-rotateTo(Mouse.xs - this.x, Mouse.ys - this.y));
      ctx.fillStyle = hsla(0, 0, 20, 1);
      ctx.fillRect(-circSize / 4, height, circSize / 2, -height);
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(0, 0, circSize / 4, startAngle, endAngle, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(0, height, circSize / 4, startAngle, endAngle, false);
      ctx.closePath();
      ctx.fill();
      return ctx.restore();
    };

    return Square;

  })();

  squares = [];

  squares.draw = function() {
    var i, _i, _ref, _results;

    _results = [];
    for (i = _i = 0, _ref = squares.length; _i < _ref; i = _i += 1) {
      _results.push(squares[i].draw());
    }
    return _results;
  };

  squares.counter = 0;

  squares.make = function(x, y, limit) {
    var index, _results;

    if (limit == null) {
      limit = 180;
    }
    this.counter++;
    index = this.counter % limit;
    this.push(new Square(index, x, y));
    _results = [];
    while (this.length >= limit) {
      _results.push(this.shift());
    }
    return _results;
  };

  squares.mouseDraw = function(points, limit) {
    var p;

    p = points[points.length - 1];
    return squares.make(p.x, p.y, limit);
  };

  squares.makeGrid = function() {
    var g, i, inc, j, limit, _i, _j, _ref, _ref1, _ref2, _ref3;

    squares.length = 0;
    g = Math.floor(Math.hyp(canvas.height, canvas.width)) / 16;
    inc = g * 0.75;
    limit = Math.pow(canvas.max, 2) / g;
    for (i = _i = _ref = canvas.top, _ref1 = canvas.bottom + g; inc > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += inc) {
      for (j = _j = _ref2 = canvas.left, _ref3 = canvas.right + g; inc > 0 ? _j <= _ref3 : _j >= _ref3; j = _j += inc) {
        squares.make(j, i, limit);
      }
    }
    return squares;
  };

  ctx.drawLine = function(points, color) {
    var i, p, p0, _i, _ref;

    if (color == null) {
      color = 'green';
    }
    p0 = points[0];
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    for (i = _i = 1, _ref = points.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
      p = points[i];
      ctx.lineTo(p.x, p.y);
    }
    return ctx.stroke();
  };

  tilt = function(a, x, y) {
    var d, n;

    if (a == null) {
      a = 40;
    }
    if (x == null) {
      x = Mouse.xs;
    }
    if (y == null) {
      y = Mouse.ys;
    }
    n = x / canvas.width;
    d = canvas.height / y * a;
    return n / d;
  };

  ctx.imageSmoothing(true);

  squares.makeGrid();

  window.addEventListener('resize', squares.makeGrid, false);

  Configuration = function() {
    this.clear = function() {
      ctx.clearRect(canvas.left, canvas.top, canvas.width, canvas.height);
      return pre_ctx.clearRect(0, 0, pre_canvas.width, pre_canvas.height);
    };
    this.fillBlack = function() {
      ctx.fillStyle = hsla(0, 0, 0, 1);
      pre_ctx.fillStyle = ctx.fillStyle;
      ctx.fillRect(canvas.left, canvas.top, canvas.width, canvas.height);
      return pre_ctx.fillRect(0, 0, pre_canvas.width, pre_canvas.height);
    };
    this.fillGrey = function() {
      ctx.fillStyle = hsla(0, 0, 50, 1);
      pre_ctx.fillStyle = ctx.fillStyle;
      ctx.fillRect(canvas.left, canvas.top, canvas.width, canvas.height);
      return pre_ctx.fillRect(0, 0, pre_canvas.width, pre_canvas.height);
    };
    this.fillWhite = function() {
      ctx.fillStyle = hsla(0, 0, 100, 1);
      pre_ctx.fillStyle = ctx.fillStyle;
      ctx.fillRect(canvas.left, canvas.top, canvas.width, canvas.height);
      return pre_ctx.fillRect(0, 0, pre_canvas.width, pre_canvas.height);
    };
    this.symmetry = Math.round(Math.random() * 10);
    this.brush_hue = true;
    this.brush_saturation = true;
    this.brush_light = true;
    this.brush_alpha = true;
    this.brush_blending_mode = 'source-over';
    this.blending_mode = 'hard-light';
    this.smoothing = true;
    return this.tail = 30;
  };

  config = new Configuration();

  spread = function() {
    return ((Mouse.clicks % 3) - 1) * 3;
  };

  Follower = (function() {
    function Follower(index, x, y) {
      this.index = index;
      this.x = x;
      this.y = y;
      this.x0 = this.x;
      this.y0 = this.y;
      this.clickRotate = 0;
      this.randomHueSeed = Math.floor(Math.random() * 360);
      this.randomLightSeed = Math.floor(Math.random() * 100);
      this.randomAlphaSeed = Math.floor(Math.random() * 100) / 100;
    }

    Follower.prototype.draw = function() {
      var alpha, hue, light, light1, rotation, saturation, size;

      if (Mouse.down) {
        this.clickRotate++;
      }
      size = 1 + this.index * 3;
      ctx.save();
      ctx.translate(this.x0, this.y0);
      rotation = Math.sin(this.index / (Math.cos(timeInc(32000)) + 16.1));
      ctx.rotate(rotation);
      if (config.brush_hue) {
        hue = this.index / config.tail * 360 - timeInc(32);
      } else {
        hue = this.index / config.tail * 90 - timeInc(32);
      }
      if (config.brush_saturation) {
        saturation = 100;
      } else {
        saturation = 0;
      }
      if (config.brush_light) {
        light1 = (Math.sin(0 - timeInc(800) + this.index / config.tail * 2 * Math.PI) + 1) * 50;
        light = Math.round(light1 * 100) / 100;
      } else {
        light = 50;
      }
      if (config.brush_alpha) {
        alpha = 1 - this.index / config.tail;
      } else {
        alpha = 1;
      }
      ctx.fillStyle = hsla(hue % 360, saturation, light, alpha);
      ctx.fillRect(-size / 2, -size / 2, size, size);
      return ctx.restore();
    };

    Follower.prototype.follow = function() {
      var divisor, x1, y1;

      if (this.index === 0) {
        x1 = Mouse.xs;
        y1 = Mouse.ys;
      } else {
        x1 = followers[this.index - 1].x0;
        y1 = followers[this.index - 1].y0;
      }
      divisor = 0.5;
      this.x0 += (x1 - this.x0) * divisor;
      return this.y0 += (y1 - this.y0) * divisor;
    };

    return Follower;

  })();

  window.followers = [];

  followers.add = function() {
    var x, y;

    if (followers.length === 0) {
      x = Mouse.xs;
      y = Mouse.ys;
    } else {
      x = followers[followers.length - 1].x0;
      y = followers[followers.length - 1].y0;
    }
    return followers.push(new Follower(followers.length, x, y));
  };

  followers.fill = function() {
    if (followers.length < config.tail) {
      return followers.add();
    } else if (followers.length > config.tail) {
      return followers.pop();
    }
  };

  paintFollowers = function() {
    var j, _results;

    j = followers.length - 1;
    _results = [];
    while (j >= 0) {
      followers[j].draw();
      _results.push(j--);
    }
    return _results;
  };

  window.blendArray = ['source-over', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

  showBlendMode = function() {
    return console.log(blendArray[Mouse.clicks % blendArray.length]);
  };

  ctx.decay = function(hor, ver, spread, r) {
    var dh, dw, dx, dy;

    if (hor == null) {
      hor = 0;
    }
    if (ver == null) {
      ver = 0;
    }
    if (spread == null) {
      spread = 0;
    }
    if (r == null) {
      r = 0;
    }
    dx = canvas.left - spread / 2;
    dy = canvas.top - spread / 2;
    dw = canvas.width + spread;
    dh = canvas.height + spread;
    ctx.save();
    ctx.translate(hor, ver);
    ctx.rotate(r);
    ctx.drawImage(canvas, dx, dy, dw, dh);
    return ctx.restore();
  };

  symmetry = config.symmetry;

  pre_decay = function() {
    pre_ctx.save();
    pre_ctx.translate(pre_canvas.width / 2, pre_canvas.height / 2);
    pre_ctx.drawImage(canvas, canvas.left, canvas.top);
    pre_ctx.restore();
    if (symmetry < config.symmetry) {
      symmetry += Math.abs(config.symmetry - symmetry) / 16;
    } else if (symmetry > config.symmetry) {
      symmetry -= Math.abs(config.symmetry - symmetry) / 16;
    } else {

    }
    pre_ctx.save();
    pre_ctx.translate(pre_canvas.width / 2, pre_canvas.height / 2);
    pre_ctx.rotate(Math.PI + symmetry);
    pre_ctx.drawImage(pre_canvas, -pre_canvas.width / 2, -pre_canvas.height / 2);
    ctx.drawImage(pre_canvas, 0, 0, pre_canvas.width, pre_canvas.height, canvas.left - (pre_canvas.width - canvas.width) / 2 + 1, canvas.top - (pre_canvas.height - canvas.height) / 2, pre_canvas.width, pre_canvas.height);
    return pre_ctx.restore();
  };

  animloop = function() {
    var i, _i, _ref;

    window.requestAnimationFrame(animloop);
    imageSmoothing(ctx, config.smoothing);
    imageSmoothing(pre_ctx, config.smoothing);
    followers.fill();
    for (i = _i = 0, _ref = followers.length; _i < _ref; i = _i += 1) {
      followers[i].follow();
    }
    ctx.globalCompositeOperation = config.brush_blending_mode;
    paintFollowers();
    ctx.globalCompositeOperation = 'source-over';
    pre_ctx.globalCompositeOperation = config.blending_mode;
    return pre_decay();
  };

  window.onload = function() {
    var gui;

    gui = new dat.GUI();
    gui.close();
    gui.add(config, 'symmetry', -12, 12).step(1);
    gui.add(config, 'brush_blending_mode', blendArray);
    gui.add(config, 'blending_mode', blendArray);
    gui.add(config, 'tail', 2, 300).step(1);
    gui.add(config, 'brush_hue');
    gui.add(config, 'brush_saturation');
    gui.add(config, 'brush_light');
    gui.add(config, 'brush_alpha');
    gui.add(config, 'smoothing');
    gui.add(config, 'fillBlack');
    gui.add(config, 'fillGrey');
    gui.add(config, 'fillWhite');
    gui.add(config, 'clear');
    return animloop();
  };

}).call(this);

/*
//@ sourceMappingURL=25.map
*/
