// Generated by CoffeeScript 1.6.2
/*
	rgba cycling by offset sin(time)
*/


(function() {
  var Configuration, FRAME, PI, abs, animloop, between, cos, hsla, hyp, initGui, rainbowSquare, rgba, sin, tan;

  FRAME = 0;

  PI = Math.PI;

  sin = function(a) {
    return Math.sin(a);
  };

  cos = function(a) {
    return Math.cos(a);
  };

  tan = function(a) {
    return Math.tan(a);
  };

  abs = function(a) {
    return Math.abs(a);
  };

  hyp = function(a, b) {
    return Math.sqrt(a * a + b * b);
  };

  between = function(min, x, max) {
    return Math.min(Math.max(x, min), max);
  };

  rgba = function(r, g, b, a) {
    if (r == null) {
      r = 255;
    }
    if (g == null) {
      g = 0;
    }
    if (b == null) {
      b = 255;
    }
    if (a == null) {
      a = 1;
    }
    r = between(0, r | 0, 255);
    g = between(0, g | 0, 255);
    b = between(0, b | 0, 255);
    a = between(0, a, 1);
    return "rgba( " + r + ", " + g + ", " + b + ", " + a + ")";
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
    h = (h | 0) % 360;
    s = between(0, s, 100);
    l = between(0, l, 100);
    a = between(0, a, 1);
    return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
  };

  window.rainbow = function(a, offset) {
    var b, g, r;

    if (offset == null) {
      offset = 1;
    }
    r = sin(a + 0 * PI / 3 * offset) * 127 + 128;
    g = sin(a + 2 * PI / 3 * offset) * 127 + 128;
    b = sin(a + 4 * PI / 3 * offset) * 127 + 128;
    return rgba(r, g, b, 1);
  };

  rainbowSquare = function() {
    var i, j, speed, square_height, square_width, x, x_adj, y, y_adj, _i, _ref, _ref1, _results;

    square_height = hyp(canvas.height, canvas.width) / cfg.size;
    square_width = square_height;
    _results = [];
    for (i = _i = _ref = canvas.left, _ref1 = canvas.right; square_width > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += square_width) {
      _results.push((function() {
        var _j, _ref2, _ref3, _results1;

        _results1 = [];
        for (j = _j = _ref2 = canvas.top, _ref3 = canvas.bottom; square_height > 0 ? _j <= _ref3 : _j >= _ref3; j = _j += square_height) {
          speed = FRAME * 1 / 60 * cfg.speed;
          x_adj = i * cfg.x_a / canvas.width;
          y_adj = j * cfg.y_a / canvas.height;
          ctx.fillStyle = rainbow(speed - x_adj - y_adj, cfg.sat * -sin(x_adj + y_adj));
          x = i;
          y = j;
          _results1.push(ctx.fillRect(x, y, square_width, square_height));
        }
        return _results1;
      })());
    }
    return _results;
  };

  animloop = function() {
    requestAnimationFrame(animloop);
    FRAME++;
    return rainbowSquare();
  };

  Configuration = function() {
    return {
      size: 48,
      x_a: 5,
      y_a: -10,
      speed: 1,
      sat: 0.6
    };
  };

  window.cfg = new Configuration();

  initGui = function() {
    var gui;

    gui = new dat.GUI();
    gui.close();
    dat.GUI.toggleHide();
    gui.add(cfg, 'size', 1, 64);
    gui.add(cfg, 'x_a', -120, 120);
    gui.add(cfg, 'y_a', -120, 120);
    gui.add(cfg, 'speed', 0, 60);
    return gui.add(cfg, 'sat', 0, 1);
  };

  window.onload = function() {
    initGui();
    return animloop();
  };

}).call(this);

/*
//@ sourceMappingURL=03.map
*/
