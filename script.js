const dino = document.querySelector('.dino');           //peguei o elemento dino da página e guardei na const dino
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {                           //verifica se foi pressionada a tecla espaço
    if (event.keyCode === 32 || event.keyCode === 38) { //código 32 == espaço, código 38 == seta pra cima
        if (!isJumping){
            jump();
        }
    }
}

function jump() {
    //let position = 0;                                   //posição inicial do dinossauro
    isJumping = true;

    let upInterval = setInterval(() => {                //comando se repete a cada 20ms
        if (position >= 150) {
            // Para de subir
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    // Para de descer
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    // Descendo
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);       //vê se uma tecla foi pressionada