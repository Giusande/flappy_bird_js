console.log("FlappyBird JS")
console.log("Author: iamageo")
console.log("Credits: Dev Soltinho")

let frames = 0;
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

function criaChao() {
    
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224, 
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
            
        },
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

    return chao;
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
    
            if(fazColisao(flappyBird, globais.chao)) {
                //console.log("Fez colisao")
                som_Hit.play()
                mudaParaTela(Telas.GAME_OVER)
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        movimentos: [
            {spriteX: 0, spriteY: 0},
            {spriteX: 0, spriteY: 26},
            {spriteX: 0, spriteY: 52},
        ],
        frameAtual: 0,
        atualizaFrameAtual () {
            const intervaloDeFrames = 10;
            const passouDoIntervalo = frames % intervaloDeFrames

            if(passouDoIntervalo === 0) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao
            }

            //console.log('incremento: ', incremento);
            //console.log('bade repetição: ', baseRepeticao);
            //console.log('frame: ', incremento % baseRepeticao);

        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const {spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                sprites,
                spriteX, spriteY, //sprite x, sprite y
                flappyBird.largura, flappyBird.altura, // tmanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura, //tamanho do desenho
            );
        
        },
       
    }

    return flappyBird;
}

function criaCanos() {
    const canos = {
        largura: 52, 
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {   
            
            canos.pares.forEach(function(par) {

                const yrandom = par.y;  //variável randomica pra subir e descer canos
                const escacamentoEntreCanos = 90; //espaço entre cada cano
    
                const canoCeuX = par.x;
                const canoCeuY = 0 + yrandom;
                
                //cano do ceu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY, //sprite x, sprite y
                    canos.largura, canos.altura, // tmanho do recorte na sprite
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura, //tamanho do desenho
                );
    
                //cano do chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + escacamentoEntreCanos + yrandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY, //sprite x, sprite y
                    canos.largura, canos.altura, // tmanho do recorte na sprite
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura, //tamanho do desenho
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })

        },
        temColisaoComFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
    
            if((globais.flappyBird.x + globais.flappyBird.largura - 3) >= par.x) {
                //console.log("o passaro invadiu a área dos canos")
                
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }
                
                if (peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
                
            return false;
        },
        pares: [
            
         ],
        atualiza() {
            const passou100Frames = frames % 100 === 0;

            if(passou100Frames) {
                //console.log("passou 100 frames")
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if (canos.temColisaoComFlappyBird(par)) {
                    //console.log("você perdeu!")
                    som_Hit.play();
                    mudaParaTela(Telas.GAME_OVER);
                }

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }

            });

        }

    }

    return canos;
}

function criaPlacar() {    
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '30px "Press Start 2P"';
            contexto.fillStyle = 'white';
            contexto.textAlign = 'right';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 40)
            placar.pontuacao
            
        },
        atualiza(){
            const intervaloDeFrames = 100;
            const passouDoIntervalo = frames % intervaloDeFrames === 0;

            if(passouDoIntervalo) {
                placar.pontuacao += 1
            }

        }
    }
    return placar;
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

const telaDeGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226, 
    altura: 200,
    x: (canvas.width/2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            telaDeGameOver.spriteX, telaDeGameOver.spriteY, //sprite x, sprite y
            telaDeGameOver.largura, telaDeGameOver.altura, // tmanho do recorte na sprite
            telaDeGameOver.x, telaDeGameOver.y,
            telaDeGameOver.largura, telaDeGameOver.altura, //tamanho do desenho
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
            globais.chao = criaChao();
            globais.canos = criaCanos();
         
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();

            globais.chao.desenha();
            telaDeInicio.desenha();
        }, 
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
}

Telas.GAME_OVER = {
    desenha() {
        telaDeGameOver.desenha()
    }, 
    atualiza() {

    },
    click() {
        mudaParaTela(Telas.INICIO)
    }
}


Telas.JOGO ={
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha()
    }, 
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
}


function loop() {
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click()) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO)
loop();