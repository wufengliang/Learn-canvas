const canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d");

let isDragging = false;

function getPoint(e) {
  const { left, top } = canvas.getBoundingClientRect();
  const { clientX, clientY } = e;
  return {
    x: clientX - left,
    y: clientY - top,
  };
}

canvas.addEventListener(
  "mousedown",
  (e) => {
    const { x, y } = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDragging = true;
  },
  false
);

window.addEventListener(
  "mousemove",
  (e) => {
    if (!isDragging) {
      return;
    }
    const { x, y } = getPoint(e);
    ctx.lineWidth = 10;
    ctx.lineTo(x, y);
    ctx.stroke();
  },
  false
);

window.addEventListener(
  "mouseup",
  () => {
    isDragging = false;
  },
  false
);
