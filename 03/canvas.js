const canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d");

let w, h;
let isBegin = false;
let point = { start: null, end: null };

!(function () {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
  window.onresize = arguments.callee;
  canvas.addEventListener("mousedown", mousedown, false);
  canvas.addEventListener("mousemove", mousemove, false);
  canvas.addEventListener("mouseup", mouseup, false);
})();

//  鼠标按下
function mousedown(e) {
  isBegin = true;
  point.start = getPoint(e);
}

//  鼠标移动
function mousemove(e) {
  if (!isBegin) {
    return;
  }
  point.end = getPoint(e);
  drawRect();
}

//  鼠标抬起
function mouseup(e) {
  isBegin = false;
  point = { start: null, end: null };
}

//  获取位置
function getPoint(e) {
  return {
    x: e.pageX,
    y: e.pageY,
  };
}

//  画矩形
function drawRect() {
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-over";
  ctx.moveTo(point.start.x, point.start.y);
  ctx.lineTo(point.end.x, point.start.y);
  ctx.lineTo(point.end.x, point.end.y);
  ctx.lineTo(point.start.x, point.end.y);
  ctx.lineTo(point.start.x, point.start.y);
  ctx.stroke();
  ctx.closePath();
}

//  获取画矩形和清楚矩形的数据
function getParams() {
  const x = point.start.x,
    y = point.start.y;

  const w = point.end.x - point.start.x,
    h = point.end.y - point.start.y;
  return {
    x,
    y,
    w,
    h,
  };
}
