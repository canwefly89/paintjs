const canvas = document.getElementById("jsCanvas"); //canvas는 html 기능 pixel을 다루는..
const ctx = canvas.getContext("2d"); // 2d로 작업
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c"; //반복하게 된다면, 이런식으로 변수 생성
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE; //html canvas에 사이즈를 알려줌
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; //기본 선색깔
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //기본 선굵기

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); //캔버스 위에서 마우스 떼면 아예 새로운 line으로 만듦 => 이전 line에 영향 안 줌 (색상 등)
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //evnt.target : 해당하는 event DOM 객체 불러오기
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  //console.log(event.target.value);      //console.log로 event 찍어서 그 안에 있는 객체를 확인한다! > 'value'라는 component를 가져와야 하는구나를 알기 위해
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    //처음에 false 값이기 때문에
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(
  color => color.addEventListener("click", handleColorClick) //각각의 colors 배열 안에 있는 요소에 적용한다.
);

if (range) {
  //물론 여기서 range는 늘 true지만, safe/check를 위해서 if로 한 번 감싸주기 (element가 없을 경우의 전체 에러 방지)
  range.addEventListener("input", handleRangeChange); //html의 input 요소 (bar)
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
