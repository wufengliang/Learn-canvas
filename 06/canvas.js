const canvas = document.querySelector("#canvas");
let ctx;

if (canvas.getContext) {
  ctx = canvas.getContext("2d");
  init();
}

function init() {
  ctx.beginPath();
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-out";

  canvas.onmousedown = function (e) {
    const { clientX: x, clientY: y } = e;
    ctx.moveTo(x, y);
    canvas.onmousemove = function (e) {
      const { clientX: _x, clientY: _y } = e;
      ctx.lineTo(_x, _y);
      ctx.lineWidth = 20;
      ctx.stroke();
    };
  };
  canvas.onmouseup = function () {
    canvas.onmousemove = null;
  };
}
