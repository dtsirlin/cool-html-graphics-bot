Mouse = {x:cw/2, y:ch/2, xA:[cw/2], yA:[ch/2], up: true, clicks:0, timer:0};

Mouse.events = {};
Mouse.events.move = function(e){
  // ios
  if ("touches" in e) e = e.touches[0];
  //http://code.google.com/p/chromium/issues/detail?id=5598
  if (e.pageX === Mouse.x && e.pageY === Mouse.y) return;
  Mouse.x = Math.round(e.pageX);
  Mouse.y = Math.round(e.pageY);
};

Mouse.path = [];
Mouse.path.x = [cw/2];
Mouse.path.y = [ch/2];
Mouse.path.capture = function(){
  Mouse.path.x.unshift([Mouse.x]);
  Mouse.path.y.unshift([Mouse.y]);
  while (Mouse.path.x.length > 120){
    Mouse.path.x.pop();
    Mouse.path.y.pop();
  }
};

pos = [];
Mouse.avg = function(a, followSpeed, x, y){

  if(!Array.isArray(pos[a])) pos[a] = [cw/2,ch/2];

  if ( x > pos[a][0] ) {
    pos[a][0] += (x - pos[a][0])/followSpeed;
  } else if ( x < pos[a][0]) {
    pos[a][0] -= (pos[a][0] - x)/followSpeed;
  } else {
    pos[a][0] += 0;
  }
  if ( y > pos[a][1] ) {
    pos[a][1] += (y - pos[a][1])/followSpeed;
  } else if ( y < pos[a][1]) {
    pos[a][1] -= (pos[a][1] - y)/followSpeed;
  } else {
    pos[a][1] += 0;
  }
  Mouse.xA[a] = Math.round(pos[a][0]) +0.5;
  Mouse.yA[a] = Math.round(pos[a][1]) +0.5;
};

Mouse.events.up = function(e){
  Mouse.down = false;
  Mouse.up = true;
};

Mouse.events.down = function(e){
  // ios
  if ("touches" in e) {
    e.preventDefault();
    e = e.touches[0];
  };
  Mouse.down = true;
  Mouse.up = false;
  Mouse.clicks =+ 1;
};

document.addEventListener("mousemove", Mouse.events.move);
document.addEventListener("touchmove", Mouse.events.move);

document.addEventListener("mousedown", Mouse.events.down);
document.addEventListener("touchstart", Mouse.events.down);
document.addEventListener("touchstart", Mouse.events.move);

document.addEventListener("touchend", Mouse.events.up);
document.addEventListener("mouseup", Mouse.events.up);