console.log("FlappyBird JS")
console.log("Author: iamageo")
console.log("Credits: Dev Soltinho")

const som_Hit = new Audio();
som_Hit.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    
    spriteX: 390,
    spriteY: 0,
    largura: 275, 
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite x, sprite y
            planoDeFundo.largura, planoDeFundo.altura, // tmanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do desenho
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite x, sprite y
            planoDeFundo.largura, planoDeFundo.altura, // tmanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do desenho
        );
    }

}

const chao = {

    spriteX: 0,
    spriteY: 610,
    largura: 224, 
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //sprite x, sprite y
            chao.largura, chao.altura, // tmanho do recorte na sprite
            chao.x, chao.y,
            chao.largura, chao.altura, //tamanho do desenho
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //sprite x, sprite y
            chao.largura, chao.altura, // tmanho do recorte na sprite
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura, //tamanho do desenho
        );
    
    }
}

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y; 

    if(flappyBirdY >= chaoY){
        return true;
    }

    return false;
}

function criaflappyBird () {

    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33, 
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {    
            flappyBird.velocidade = - flappyBird.pulo;  
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza () {
    
            if(fazColisao(flappyBird, chao)) {
                console.log("Fez colisao")
                som_Hit.play();

                mudaParaTela(Telas.INICIO)
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, //sprite x, sprite y
                flappyBird.largura, flappyBird.altura, // tmanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura, //tamanho do desenho
            );
        
        },
       
    }

    return flappyBird;
}

const telaDeInicio = {
    spriteX: 134,
    spriteY: 0,
    largura: 174, 
    altura: 152,
    x: (canvas.width/2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            telaDeInicio.spriteX, telaDeInicio.spriteY, //sprite x, sprite y
            telaDeInicio.largura, telaDeInicio.altura, // tmanho do recorte na sprite
            telaDeInicio.x, telaDeInicio.y,
            telaDeInicio.largura, telaDeInicio.altura, //tamanho do desenho
        );
    
    }
}



//Manipulação de telas
const globais = {}
let telaAtiva = {}

function mudaParaTela(novaTela) {
    telaAtiva = novaTela

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}
const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaflappyBird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            telaDeInicio.desenha();
        }, 
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {

        }
    }
}

Telas.JOGO ={
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    }, 
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
}


function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click()) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO)
loop();