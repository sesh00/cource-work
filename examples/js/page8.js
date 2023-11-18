let image= new Image();
image.onload = function (){
    ctx.save();
    ctx.translate(40, -10);
    ctx.rotate(30 * Math.PI / 180);
    ctx.scale(0.3, 0.3);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
    ctx.save();
    ctx.rotate(-30)
    setInterval(move, 500);
    ctx.rotate(30 * Math.PI / 180);
    ctx.translate(100, 100);
    ctx.scale(0.4, 0.4);
    ctx.drawImage(image, 0, 0);
    ctx.restore();


}
image.src =`../pics/run0.png`;



