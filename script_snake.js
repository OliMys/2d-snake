var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const grid = 10;
function getSingleRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
let direction = {
  up: { x:0, y: -grid },
  down: { x:0, y: grid },
  right: { x: grid, y: 0 },
  left: {x: -grid, y: 0}
};
var snake = {
  x: Math.floor(Math.random() * 500),
  y: Math.floor(Math.random() * 350),
  //dx: grid,
  //dy: 0,
  body: [],
  maxCells: 6,
  turn() {
    if(snake.state == direction.up) {
    snake.state = getSingleRandom([direction.up, direction.right, direction.left]);
  } else if(snake.state == direction.down) {
    snake.state = getSingleRandom([direction.down, direction.right, direction.left]);
  } else if(snake.state == direction.right) {
    snake.state = getSingleRandom([direction.up, direction.down, direction.right]);
  } else if(snake.state == direction.left){
    snake.state = getSingleRandom([direction.up, direction.down, direction.left]);
  }
  //snake.maxCells++;
    return snake.state;
  }
};

snake.state = getSingleRandom(Object.values(direction));

console.log(snake.state);
console.log(snake.turn());
console.log(snake.state.x);

function collisionDetection() {
  if (snake.x === grid || snake.x === canvas.width - grid) {
    if (snake.y == grid) {
      snake.state = direction.down;
    } else if (snake.y == canvas.height - grid) {
      snake.state = direction.up;
    } else { getSingleRandom([direction.down, direction.up]); }
  }
  
  if (snake.y === grid || snake.y === canvas.height - grid) {
    if (snake.x == grid) {
      snake.state = direction.right;
    } else if (snake.x == canvas.width - grid) {
      snake.state = direction.left;
    } else { getSingleRandom([direction.right, direction.left]); }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  snake.body.unshift({ x: snake.x, y: snake.y });
  if (snake.body.length > snake.maxCells) {
    snake.body.pop();
  }
  
  if (snake.x < 0) { 
    snake.x = canvas.width - grid; 
  }
  else if (snake.x >= canvas.width) { 
    snake.x = 0; 
  }
  if (snake.y < 0) { 
    snake.y = canvas.height - grid; 
  } else if (snake.y >= canvas.height) { 
    snake.y = 0; 
  }
  
  snake.x += snake.state.x;
  snake.y += snake.state.y;
  //console.log(x);
  
  ctx.fillStyle = "#03C03C";
  snake.body.forEach(function (elem, index) {
    ctx.fillRect(elem.x, elem.y, grid - 1, grid - 1);
  });
}
setInterval(draw, 500);
setInterval(() => snake.turn(), 1000);