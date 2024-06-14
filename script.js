const saveBtn = document.getElementById("save");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

let isPainting = false;
let isFilling = false;

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }

  ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}

function onColorClick(e) {
  console.dir(e.target);
  console.log(e.target.dataset.color);

  const colorValue = e.target.dataset.color;

  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onCanvasClick(e) {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function onDoubleClick(e) {
  const text = textInput.value;
  if (text === "") {
    return;
  }

  ctx.save();

  ctx.lineWidth = 1;
  ctx.font = "30px Arial";

  ctx.strokeText(text, e.offsetX, e.offsetY);
  ctx.restore();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

console.log("color-options", colorOptions);

colorOptions.forEach((option) => {
  option.addEventListener("click", onColorClick);
});

modeBtn.addEventListener("click", () => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
});

destroyBtn.addEventListener("click", () => {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

eraserBtn.addEventListener("click", () => {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  console.log(url);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 200, 200, canvas.width / 2, canvas.height / 2);
  };

  fineInput.value = null;
});

saveBtn.addEventListener("click", () => {
  const dataUrl = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "myDrawing.png";
  a.click();
});
