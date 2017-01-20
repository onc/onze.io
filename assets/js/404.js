var Colors = {

  "black": "#111111",
  "yellow": "#E9B44C",
  "red": "#9B2915",
  "green": "#50A2A7",
  "blue": "#2C365E"
};

// Entities
function Rect(x, y, size, color) {
  this.size = size || 30;

  this.x = x || 0;
  this.y = y || y;
  this.velocity = Math.random() > 0.5 ? -1 : 1;
  this.color = color || Colors.red;

  console.log('[Spawn rect] x: ' + this.x +
              ' y: ' + this.y +
              ' velocity: ' + this.velocity +
              ' color: ' + this.color);
};

Rect.prototype.draw = function(context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.size, this.size);
};

Rect.prototype.update = function() {
  if (this.x < 0) {
    this.velocity = 1;
  } else if (this.x > 450) {
    this.velocity = -1;
  }

  this.x += this.velocity;
};

// Game logic
var Game = {};

Game.fps = 50;

Game.initialize = function() {
  this.entities = [];

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var headerElement = document.getElementById("not-found-header");
  var headerStyle = headerElement.currentStyle || window.getComputedStyle(headerElement);

  var headerHeight = headerElement.offsetHeight;
  headerHeight += parseFloat(headerStyle.marginTop);
  headerHeight += parseFloat(headerStyle.marginBottom);

  this.canvasWidth = windowWidth;
  this.canvasHeight = windowHeight - headerHeight;

  var canvas = document.getElementById("viewport");
  canvas.width = this.canvasWidth;
  canvas.height = this.canvasHeight;
  canvas.style.width  = this.canvasWidth + 'px';
  canvas.style.height = this.canvasHeight + 'px';
  this.context = canvas.getContext("2d");
};

Game.draw = function() {
  this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].draw(this.context);
  }
};

Game.update = function() {
  for (var i=0; i < this.entities.length; i++) {
    this.entities[i].update();
  }
};

Game.addRect = function() {
  var rectSize = 30;
  Game.entities.push(new Rect(-rectSize,
                              this.canvasHeight - rectSize,
                              rectSize,
                              Colors.green));
};


function main() {

  // Run the game
  Game.initialize();

  Game.addRect();

  Game.run = (function() {
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

    return function() {
      loops = 0;

      while ((new Date).getTime() > nextGameTick) {
        Game.update();
        nextGameTick += skipTicks;
        loops++;
      }

      Game.draw();
    };
  })();

  (function() {
    var onEachFrame;
    onEachFrame = function(cb) {
      var _cb = function() {
        cb();
        requestAnimationFrame(_cb);
      };
      _cb();
    };

    window.onEachFrame = onEachFrame;
  })();

  window.onEachFrame(Game.run);
}

window.onload = main;
