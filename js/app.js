// Random Number Generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Enemies our player must avoid
var Enemy = function(x, y, v) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/cloud.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
  this.v = v;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.v * dt; // move the enemies at v pixels/second
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.sprite = 'images/zoe.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
  // This function is useless at the moment!
};

Player.prototype.handleInput = function(key) {
  // Move player according to keyboard input
  // If statements are used to detect canvas boundaries
  switch (key) {
    case 'left':
      if (this.x > 0) {
        this.x = this.x - 101;
      }
      break;
    case 'right':
      if (this.x < 606) {
        this.x = this.x + 101;
      }
      break;
    case 'up':
      if (this.y > -20) {
        this.y = this.y - 83;
      }
      break;
    case 'down':
      if (this.y < 395) {
        this.y = this.y + 83;
      }
  }
};

// Instantiate entities

var player = new Player(3, 0);
var allEnemies = [];

// Generate the first three enemies when the game starts
for (i = 0; i < 3; i++) {
  let x = getRandomInt(0, 6);
  let y = getRandomInt(2, 4);
  let v = getRandomInt(60, 240);
  allEnemies.push(new Enemy(x, y, v));
}

setInterval(function() {
  let x = -1;
  let y = getRandomInt(2, 4);
  let v = getRandomInt(60, 240);
  allEnemies.push(new Enemy(x, y, v));
}, 1000);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
