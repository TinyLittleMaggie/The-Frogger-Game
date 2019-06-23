// Random Number Generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simple collision detection
// In this game, objects can be considered as 101 * 83 boxes.
function collides(a, b) {
  let xDistance = Math.abs(a.x - b.x);
  let yDistance = Math.abs(a.y - b.y);
  if (xDistance < 70 && yDistance < 80) {
    return true;
  } else {
    return false;
  }
}

// This checks collisions of all entities
function checkCollisions() {
  // Detect star collection
  allStars.forEach(function(star) {
    if (collides(star, player)) {
      star.collected = true;
      starNumber++;
    }
  });
  allStars = allStars.filter(function(star) {
    return star.collected == false;
  });
  // Detect enemy attacks
  allEnemies.forEach(function(enemy) {
    if (collides(enemy, player)) {
      console.log('Game Over!');
      player.x = 202;
      player.y = -20;
    }
  });
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
      if (this.x < 404) {
        this.x = this.x + 101;
      }
      break;
    case 'up':
      if (this.y > 63) {
        // This prevents the player from going back to the blue area
        this.y = this.y - 83;
      }
      break;
    case 'down':
      if (this.y < 395) {
        this.y = this.y + 83;
      }
  }
};

// Stars that the player can collect
var Star = function(x, y) {
  this.sprite = 'images/star.png';
  this.x = x * 101;
  this.y = y * 83 - 20;
  this.collected = false;
};

Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate entities & initiate variables

var player = new Player(2, 0);
var allStars = [];
var allEnemies = [];
var starNumber = 0;

// Generate the first three enemies when the game starts
for (i = 0; i < 4; i++) {
  let x = getRandomInt(0, 4);
  let y = getRandomInt(1, 4);
  let v = getRandomInt(60, 240);
  allEnemies.push(new Enemy(x, y, v));
}

// Generate stars every 4 seconds
// (only add new stars when there are less than three stars)
setInterval(function() {
  if (allStars.length < 3) {
    let x = getRandomInt(0, 4);
    let y = getRandomInt(1, 4);
    allStars.push(new Star(x, y));
  }
}, 4000);

// Generate the rest of the enemies
setInterval(function() {
  let x = -1;
  let y = getRandomInt(1, 4);
  let v = getRandomInt(60, 240);
  allEnemies.push(new Enemy(x, y, v));
  allEnemies = allEnemies.filter(function(element) {
    return element.x < 505;
  });
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
