const canvas = document.getElementById("jsCanvas"); //canvas는 html 기능 pixel을 다루는..
const ctx = canvas.getContext("2d"); // 2d로 작업한다잉~
const colors = document.getElementsByClassName("jsColor");

canvas.width = 600; //html canvas에 사이즈를 알려줌
canvas.height = 600;

ctx.strokeStyle = "#2c2c2c"; //기본 선색깔
ctx.lineWidth = 2.5; //기본 선굵기

let painting = false;

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
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(
  color => color.addEventListener("click", handleColorClick) //각각의 colors 배열 안에 있는 요소에 적용한다.
);
