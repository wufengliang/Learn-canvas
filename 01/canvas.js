const deg = Math.PI / 180;  //  1deg;

window.onload = () => {
    const canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.getBoundingClientRect().width;

    setInterval(() => {
        drawTime(ctx, width);
    }, 1000);
};

/**
 * @description 实时画表
 */
const drawTime = (ctx, width) => {
    ctx.clearRect(0, 0, width, width);
    const date = new Date(), hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
    drawCicle(ctx, width);
    drawGrid(ctx, width);
    drawHours(ctx, width);
    drawMinuteDate(ctx, width, minute);
    drawSecondDate(ctx, width, second);
    drawHourDate(ctx, width, hour, minute);
    drawCenterCicle(ctx, width);
};

/**
 * 画外围圈
 */
const drawCicle = (ctx, width) => {
    const radius = width / 2;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#333';
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

/**
 * 秒表 分表
 */
const drawGrid = (ctx, width) => {
    const radius = width / 2;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.lineWidth = 1;
    for (let i = 1; i <= 60; i++) {
        ctx.rotate(6 * deg);
        ctx.moveTo(radius - 5, 0);
        ctx.lineTo(radius, 0);
    }
    ctx.stroke();
    ctx.restore();
}

/**
 * 时表
 */
const drawHours = (ctx, width) => {
    const radius = width / 2, numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2], hourDeg = 30 * deg;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    numbers.forEach((item, index) => {
        const x = Math.cos(hourDeg * index) * (radius - 25), y = Math.sin(hourDeg * index) * (radius - 25);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item, x, y);
    })

    for (let i = 0; i < 12; i++) {
        ctx.lineWidth = 2;
        ctx.lieCap = 'round';
        ctx.strokeStyle = '#666';
        ctx.moveTo(radius - 10, 0);
        ctx.lineTo(radius, 0);
        ctx.rotate(hourDeg);
    }
    ctx.stroke();
    ctx.restore();
}

/**
 * 画秒针
 */
const drawSecondDate = (ctx, width, second) => {
    const secondRadius = (second - 15) * 6 * deg, radius = width / 2;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.strokeStyle = '#f00';
    ctx.lineCap = 'round';
    ctx.rotate(secondRadius);
    ctx.moveTo(-20, 0);
    ctx.lineTo(radius - 15, 0);
    ctx.stroke();
    ctx.restore();
}

/**
 * 画分针
 */
const drawMinuteDate = (ctx, width, minute) => {
    const radius = width / 2, minuteDeg = (minute - 15) * 6 * deg;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.rotate(minuteDeg);
    ctx.strokeStyle = '#555';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
    ctx.moveTo(-20, 0);
    ctx.lineTo(radius - 40, 0);
    ctx.stroke();
    ctx.restore();
}


/**
 * 画小时
 */
const drawHourDate = (ctx, width, hour, minute) => {
    const radius = width / 2;
    const hourDeg = ((hour - 3) * 30 + minute / 60 * 30) * deg;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.beginPath();
    ctx.rotate(hourDeg);
    ctx.strokeStyle = '#000';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.moveTo(-20, 0);
    ctx.lineTo(radius - 80, 0);
    ctx.stroke();
    ctx.restore();
}

const drawCenterCicle = (ctx, width) => {
    const radius = width / 2;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.fillStyle = 'rgba(0,0,0,.9)';
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}