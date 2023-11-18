let image = new Image();
image.onload = function () {
    setInterval(move, 500);
}

let x = 10;
image.src =`../pics/run0.png`;
function move() {
    if (x < 200) x += 1; else x = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    image.src =`../pics/run${x%4}.png`;
    ctx.drawImage(image, x, 10, 60, 88);

}


