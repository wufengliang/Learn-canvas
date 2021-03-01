const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

let rubberbandDiv = document.querySelector("#rubberbandDiv"),
  image = new Image(),
  mousedown = {},
  rubberbandRect = {},
  dragging = false;

function rubberbandStart(x, y) {
  mousedown.x = x;
  mousedown.y = y;

  rubberbandRect.left = mousedown.x;
  rubberbandRect.top = mousedown.y;

  moveRubberbandDiv();
  showRubberbandDiv();

  dragging = true;
}

function rubberbandStretch(x, y) {
  rubberbandRect.left = x > mousedown.x ? mousedown.x : x;
  rubberbandRect.top = y > mousedown.y ? mousedown.y : y;

  rubberbandRect.width = Math.abs(mousedown.x - x);
  rubberbandRect.height = Math.abs(mousedown.y - y);

  moveRubberbandDiv();
  resizeRubberbandDiv();
}

function rubberbandEnd() {
  const box = canvas.getBoundingClientRect();
  try {
    ctx.drawImage(
      canvas,
      rubberbandRect.left - box.left,
      rubberbandRect.top - box.top,
      rubberbandRect.width,
      rubberbandRect.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  } catch (e) {
    console.error(e);
  }

  resetRubberbandRect();
  rubberbandDiv.style.width = 0;
  rubberbandDiv.style.height = 0;
  hideRubberbandDiv();
  dragging = false;
}

function moveRubberbandDiv() {
  rubberbandDiv.style.top = rubberbandRect.top + "px";
  rubberbandDiv.style.left = rubberbandRect.left + "px";
}

function resizeRubberbandDiv() {
  rubberbandDiv.style.width = rubberbandRect.width + "px";
  rubberbandDiv.style.height = rubberbandRect.height + "px";
}

function showRubberbandDiv() {
  rubberbandDiv.style.display = "inline";
}

function hideRubberbandDiv() {
  rubberbandDiv.style.display = "none";
}

function resetRubberbandRect() {
  rubberbandRect = { top: 0, left: 0, width: 0, height: 0 };
}

canvas.onmousedown = function (e) {
  const x = e.clientX,
    y = e.clientX;

  e.preventDefault();
  rubberbandStart(x, y);
};

window.onmousemove = function (e) {
  const x = e.clientX,
    y = e.clientY;

  e.preventDefault();
  if (dragging) {
    rubberbandStretch(x, y);
  }
};

window.onmouseup = function (e) {
  e.preventDefault();
  rubberbandEnd();
};

image.onload = function () {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

image.src = "./1.jpg";
