console.log("Flappy JS")

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33, 
    altura: 24,
    x: 10,
    y: 50
}



function loop() {
    
    contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY, //sprite x, sprite y
        flappyBird.largura, flappyBird.altura, // tmanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura, //tamanho do desenho
    );

    requestAnimationFrame(loop);
}

loop();