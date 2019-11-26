let currentState;   //当前的状态（暂停还是正在运行中）
let canvas, ctx, gridSize, currentPosition, snakeBody, snakeLength, direction, score, suggestedPoint, allowPressKeys, interval, choice;
//更新分数，规则是吃掉一次食物，就加 10 分
function updateScore() {
  //贪吃蛇初始长度为 3，snakeLength 是当前的长度，每吃掉一次食物，长度加 1，因此计算分数可以用贪吃蛇长度的增量计算  
  score = (snakeLength - 3) * 10;
  document.getElementById('score').innerText = score;
}
//判断贪吃蛇是否碰到了食物，suggestedPoint 表示当前事物的位置
function hasPoint(element) {
  return (element[0] === suggestedPoint[0] && element[1] === suggestedPoint[1]);
}
//随机放置食物
function makeFoodItem() {
  suggestedPoint = [Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize];
  if (snakeBody.some(hasPoint)) {
    makeFoodItem();
  } else {
    ctx.fillStyle = 'rgb(10,100,0)';
    ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
  }
}
//判断贪吃蛇是否吃了自己，如果是，则 gameover  
function hasEatenItself(element) {
  return (element[0] === currentPosition.x && element[1] === currentPosition.y);
}
//算出左移的坐标
function leftPosition() {
  return currentPosition.x - gridSize;
}
//算出右移的坐标
function rightPosition() {
  return currentPosition.x + gridSize;
}
//算出上移的坐标
function upPosition() {
  return currentPosition.y - gridSize;
}
//算出下移的坐标
function downPosition() {
  return currentPosition.y + gridSize;
}

function whichWayToGo(axisType) {
  if (axisType === 'x') {
    choice = (currentPosition.x > canvas.width / 2) ? moveLeft() : moveRight();
  } else {
    choice = (currentPosition.y > canvas.height / 2) ? moveUp() : moveDown();
  }
}
//向上移动贪吃蛇
function moveUp() {
  if (upPosition() >= 0) {
    executeMove('up', 'y', upPosition());
  } else {
    whichWayToGo('x');
  }
}
//向下移动贪吃蛇
function moveDown() {
  if (downPosition() < canvas.height) {
    executeMove('down', 'y', downPosition());
  } else {
    whichWayToGo('x');
  }
}
//向左移动贪吃蛇
function moveLeft() {
  if (leftPosition() >= 0) {
    executeMove('left', 'x', leftPosition());
  } else {
    whichWayToGo('y');
  }
}
//向右移动贪吃蛇
function moveRight() {
  if (rightPosition() < canvas.width) {
    executeMove('right', 'x', rightPosition());
  } else {
    whichWayToGo('y');
  }
}
//开始移动贪吃蛇，dirValue 是移动的方向，axisType 表示坐标轴类型，'x' 或 'y'，axisValue 表示移动的值
function executeMove(dirValue, axisType, axisValue) {
  direction = dirValue;
  currentPosition[axisType] = axisValue;
  //绘制贪吃蛇
  drawSnake();
}
//定时器的回调函数，每 100 毫秒会调用一次
function moveSnake() {
  switch (direction) {
    case 'up':    //向上移动
      moveUp();
      break;
    case 'down':  //向下移动
      moveDown();
      break;
    case 'left':    //向左移动
      moveLeft();
      break;
    case 'right':  //向右移动
      moveRight();
      break;
  }
}
//重新开始游戏
function restart() {
  document.getElementById('play_menu').style.display = 'block';
  document.getElementById('pause_menu').style.display = 'none';
  document.getElementById('restart_menu').style.display = 'none';
  pause();
  start();
}
//暂停游戏
function pause() {
  document.getElementById('play_menu').style.display = 'none';
  document.getElementById('pause_menu').style.display = 'block';
  clearInterval(interval);
  allowPressKeys = false;
}
//开始游戏
function play() {
  document.getElementById('play_menu').style.display = 'block';
  document.getElementById('pause_menu').style.display = 'none';
  interval = setInterval(moveSnake, 100);
  allowPressKeys = true;
}
//游戏结束
function gameOver() {
  pause();
  window.alert('游戏结束，您的分数： ' + score);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('play_menu').style.display = 'none';
  document.getElementById('restart_menu').style.display = 'block';
}
//绘制贪吃蛇的一个小块，贪吃蛇不是一次绘制成的，每次只绘制一个小块，每 100 毫秒绘制一次
function drawSnake() {
  if (snakeBody.some(hasEatenItself)) {
    gameOver();
    return false;
  }
  snakeBody.push([currentPosition.x, currentPosition.y]);
  ctx.fillStyle = 'rgb(200,0,0)';

  ctx.fillRect(currentPosition.x, currentPosition.y, gridSize, gridSize);
  if (snakeBody.length > snakeLength) {
    let itemToRemove = snakeBody.shift();
    //当蛇移动后，将蛇的最后一个块清除
    ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
  }
  if (currentPosition.x === suggestedPoint[0] && currentPosition.y === suggestedPoint[1]) {
    makeFoodItem();
    snakeLength += 1;
    updateScore();
  }
}
//设置页面的键盘事件
window.document.onkeydown = function (event) {
  if (!allowPressKeys) {
    return null;
  }
  let keyCode;
  if (!event) {
    keyCode = window.event.keyCode;
  }
  else {
    keyCode = event.keyCode;
  }

  switch (keyCode) {
    case 37:  //按左箭头键

      //不能倒退
      if (direction !== 'right') {
        moveLeft();
      }
      break;

    case 38:  //按上箭头键
      if (direction !== 'down') {
        moveUp();
      }
      break;

    case 39:   //按右箭头键
      if (direction !== 'left') {
        moveRight();
      }
      break;

    case 40:   //按上箭头键
      if (direction !== 'up') {
        moveDown();
      }
      break;
    default:
      break;
  }
};
//开始游戏
function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentPosition = { 'x': 50, 'y': 50 };
  snakeBody = [];
  snakeLength = 3;
  updateScore();
  makeFoodItem();
  drawSnake();
  direction = 'right';
  play();
}
//页面初始化函数
function initialize() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  gridSize = 10;
  start();
}
//接收主进程发过来的消息
function togglePauseState() {
  if (currentState) {
    if (currentState === 'play') {
      pause();
      currentState = 'pause';
    } else {
      play();
      currentState = 'play';
    }
  } else {
    pause();
    currentState = 'play';
  }
}

const ipcRenderer = require('electron').ipcRenderer;
//接收主进程发过来的消息
ipcRenderer.on('togglePauseState', togglePauseState);
window.onload = initialize;