const canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d');

let w, h, rainArray = []; //  雨滴数组

!(function () {
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;
    window.onresize = arguments.callee;
    StartRain(66);
})()

function Rain() { };    //  定义雨滴对象

Rain.prototype = {
    init: function () {
        this.x = Random(0, w);
        this.y = 0;
        this.r = 1;
        this.speed_r = 1;
        this.speed_y = Random(4, 5);
        this.h = Random(0.8 * h, 0.9 * h);
        this.opacity = 1;
        this.opacity_speed = 0.95;
    },
    draw: function () {
        /**
         * 当y小于等于高度时 画矩形
         * 当y大于高度时 画原型
         */
        if (this.y <= this.h) {
            ctx.fillStyle = 'rgba(0,255,255)';
            ctx.fillRect(this.x, this.y, 2, 10);
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.strokeStyle = `rgba(0,255,255,${this.opacity})`;
            ctx.stroke();
        }

        this.update();
    },
    update: function () {
        /**
         * 当y小于等于高度时 y递增
         * 当y大于高度时 半径递增
         */
        if (this.y <= this.h) {
            this.y += this.speed_y;
        } else {
            if (this.opacity > 0.1) {
                this.r += 1;
                if (this.r > 50) {
                    this.opacity *= this.opacity_speed;
                }
            } else {
                this.init();
            }
        }
    }
}

function Random(min, max) {
    return Math.random() * (max - min) + min;
}

function move() {
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0, 0, w, h);
    for (let item of rainArray) {
        item.draw();
    }
    requestAnimationFrame(move);
}


function StartRain(len) {
    for (let index = 0; index < len; index++) {
        setTimeout(() => {
            let rain = new Rain();
            rain.init();
            rainArray.push(rain);
        }, index * 300)
    }
    move();
}

