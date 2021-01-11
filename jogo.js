console.log("Flappy JS")

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


function loop() {
    
    contexto.drawImage(
        sprites,
        0, 0, //sprite x, sprite y
        33, 24, // tmanho do recorte na sprite
        10, 50,
        33, 24, //tamanho do desenho
    );

    requestAnimationFrame(loop);
}

loop();