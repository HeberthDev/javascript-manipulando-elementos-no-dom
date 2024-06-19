const html = document.querySelector('html');

const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const botoes =  document.querySelectorAll('.app__card-button');

const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaTempoEsgotado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 5;
const startPauseBtn = document.querySelector('#start-pause');
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBtn?.addEventListener('click', () => {
    alterarContexto('foco');
    focoBtn.classList.add('active');
})

curtoBtn?.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
})

longoBtn?.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
})

function alterarContexto(contexto) {
    botoes.forEach((botao) => {
        botao.classList.remove('active');
    });

    html?.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch(contexto) {
        case 'foco':
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;  
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 1) {
        zerar();
        // musicaTempoEsgotado.play();
        alert('Tempo finalizado!');
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador: ', tempoDecorridoEmSegundos);
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    toggleNomeBtnESom();

    if (intervaloId) {
        zerar();
        return;
    }

    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function toggleNomeBtnESom() {
    if (startPauseBtn.innerHTML.indexOf(`<span>Pausar</span>`) !== -1) {
        startPauseBtn.innerHTML = `
            <img class="app__card-primary-butto-icon" src="imagens/play_arrow.png" alt="">
            <span>Começar</span>
        `;
        musicaPause.play();
    } else {
        startPauseBtn.innerHTML = `
            <img class="app__card-primary-butto-icon" src="imagens/pause.png" alt="">
            <span>Pausar</span>
        `;
        musicaPlay.play();
    }
}