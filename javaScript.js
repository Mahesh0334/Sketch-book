"use strict";

const canvas = document.getElementById("canvas");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const brushSize = document.getElementById("size");
const rgbColors = document.getElementById("color");
const clearScreen = document.getElementById("clear");

let context;
let size = 1;
let isPressed = false;
let color = rgbColors.value;
context = canvas.getContext("2d");

let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
  stroke();
});

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2, true);
  context.fillStyle = color;
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.lineWidth = size * 2;
  context.stroke();
}

function updateSizeOnScreen() {
  brushSize.innerText = size;
}

incBtn.addEventListener("click", () => {
  size = size + 2;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decBtn.addEventListener("click", () => {
  size = size - 2;

  if (size < 1) {
    size = 1;
  }

  updateSizeOnScreen();
});

// function undoLastPoint() {
//     var lastPoint = context.pop();
// }

rgbColors.addEventListener("change", (e) => (color = e.target.value));

clearScreen.addEventListener("click", () =>
  context.clearRect(0, 0, canvas.width, canvas.height)
);
