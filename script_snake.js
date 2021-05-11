var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var snake;

function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect()
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  
  snake.p = new Vector2(x, y);
  snake.body = [];
  console.log(snake.p);
}
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
});

const grid = 10;
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static sum(vector1, vector2) {
    return new this(vector1.x + vector2.x, vector1.y + vector2.y);
  }
  multiply(value) {
    var r = new Vector2(this.x * value, this.y * value);
    return r;
  }
  invert() {
   var r = new Vector2(this.x * -1, this.y * -1);
   if(r.x == -0) r.x = 0
   if (r.y == -0) r.y = 0
    return r;
  }
  equal(vector){
    if(vector.x == this.x && vector.y == this.y) return true;
  }
}
function getSingleRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
let direction = {
  up: new Vector2(0, -grid),
  down: new Vector2(0, grid),
  right: new Vector2(grid, 0),
  left: new Vector2(-grid, 0)
};
snake = {
  p: new Vector2(Math.floor(Math.random() * 500), Math.floor(Math.random() * 350)),
  body: [],
  maxCells: 5,
  current_velocity: new Vector2(0, 0),
  turn() {
    if(snake.velocity == direction.up) {
    
    snake.velocity = getSingleRandom([direction.up, direction.right, direction.left]);
  } else if(snake.velocity == direction.down) {
    snake.velocity = getSingleRandom([direction.down, direction.right, direction.left]);
  } else if(snake.velocity == direction.right) {
    snake.velocity = getSingleRandom([direction.up, direction.down, direction.right]);
  } else if(snake.velocity == direction.left){
    snake.velocity = getSingleRandom([direction.up, direction.down, direction.left]);
  }
  //snake.maxCells++;
    return snake.velocity;
  },
 
};

snake.velocity = getSingleRandom(Object.values(direction));

function checkCollision(position, velocity, width, height){
  var nextPosition = Vector2.sum(position, velocity);
  var y1 = height - nextPosition.y;
  var x1 = width - nextPosition.x;
  if(y1 <= 0 || y1 >= height || x1 <= 0 || x1 >= width) return true;
}
function collisionDetection() {
  
  var collision = checkCollision(snake.p, snake.velocity, canvas.width, canvas.height);
  var decisions = [];
  if(collision) {
    var invertCurVel = snake.current_velocity.invert();
    for (let value of Object.values(direction)) {
      if(value != snake.velocity && !invertCurVel.equal(value)) {
        decisions.push(value);
      }
    }
    
    snake.velocity = getSingleRandom(decisions);
    if(checkCollision(snake.p, snake.velocity, canvas.width, canvas.height)) {
      for(let i=0; i < decisions.length; i++){
        if(decisions[i] == snake.velocity) {
          decisions.splice(i,1);
        }
      }
      snake.velocity = decisions[0];
    } 
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
 collisionDetection(); 

  snake.body.unshift(snake.p);
  if (snake.body.length > snake.maxCells) {
    snake.body.pop();
  }
  snake.p = Vector2.sum(snake.p, snake.velocity);
 
  snake.current_velocity = snake.velocity;
  
  ctx.fillStyle = "#03C03C";
  snake.body.forEach(function (elem, index) {
    ctx.beginPath();
    ctx.moveTo(elem.x - (grid -1) * 0.5, elem.y - (grid -1) * 0.5);
    ctx.lineTo(elem.x + (grid -1) * 0.5, elem.y - (grid -1) * 0.5);
    ctx.lineTo(elem.x + (grid -1) * 0.5, elem.y + (grid -1) * 0.5);
    ctx.lineTo(elem.x - (grid -1) * 0.5, elem.y + (grid -1) * 0.5);
    ctx.fill();
   
  });
}
setInterval(draw, 500);
setInterval(() => snake.turn(), 1000);
