let objCanvas = null; // objeto que representa o canvas
let objContexto = null; // objeto que representa o
// Contexto do canvas

// Objetos Image para cada coisa que vai aparecer na tela
let imgFundo = new Image();
imgFundo.src = "img/fundo.png";

let imgHeroi = new Image();
imgHeroi.src = "img/heroi.png";

let imgMonstro = new Image();
imgMonstro.src = "img/monstro.png";

// Controle de Posicionamento do Heroi
let xHeroi = 100;
let yHeroi = 100;

// Controle de Posicionamento do Monstro
let xMonstro = 200;
let yMonstro = 100;

const X_HEROI_INICIAL = 100;
const Y_HEROI_INICIAL = 100;

const X_MONSTRO_INICIAL = 200;
const Y_MONSTRO_INICIAL = 100;

function Resetar() {
  isPaused = true;
  xHeroi = X_HEROI_INICIAL;
  yHeroi = Y_HEROI_INICIAL;
  xMonstro = X_MONSTRO_INICIAL;
  yMonstro = Y_MONSTRO_INICIAL;

  ResetarTempo();
  AtualizaTela();
}

function Iniciar() {
  objCanvas = document.getElementById("meuCanvas");
  objContexto = objCanvas.getContext("2d");
  objContexto.drawImage(imgFundo, 0, 0);

  AtualizaTela();
}

function AtualizaTela() {
  objContexto.drawImage(imgFundo, 0, 0);
  objContexto.drawImage(imgHeroi, xHeroi, yHeroi);
  objContexto.drawImage(imgMonstro, xMonstro, yMonstro);
}

// códigos do teclado
// lista de valores universal
const esquerda = 37;
const cima = 38;
const direita = 39;
const baixo = 40;

//taxa de incremento
let taxa = 10;

function leDoTeclado(evento) {
  if (isPaused) return;

  /* sabemos que é através do evento.keyCode
        que temos acesso ao cód da tecla
        pressionada. */
  const teclaPressionada = evento.keyCode;

  if (teclaPressionada == esquerda) {
    if (xHeroi > 32) MovimentoDoHeroi(2);
    else {
      alert("O HERÓI MORREU :( TENTE NOVAMENTE!");
      Resetar();
    }
  } else if (teclaPressionada == cima) {
    if (yHeroi > 32) MovimentoDoHeroi(3);
    else {
      alert("O HERÓI MORREU :( TENTE NOVAMENTE!");
      Resetar();
    }
  } else if (teclaPressionada == direita) {
    if (xHeroi < 512 - 64) MovimentoDoHeroi(0);
    else {
      alert("O HERÓI MORREU :( TENTE NOVAMENTE!");
      Resetar();
    }
  } else if (teclaPressionada == baixo) {
    if (yHeroi < 480 - 64) MovimentoDoHeroi(1);
    else {
      alert("O HERÓI MORREU :( TENTE NOVAMENTE!");
      Resetar();
    }
  } else return;
  if (yMonstro > yHeroi - 64 || xMonstro > xHeroi - 64) {
    if (
      yMonstro < 480 - 64 &&
      xMonstro < 512 - 64 &&
      xMonstro > 32 &&
      yMonstro > 32
    )
      MovimentoDoMonstro(30);
    else {
      alert("O MONSTRO MORREU :) TENTE NOVAMENTE!");
      Resetar();
    }
  }
  MovimentoDoMonstro(10);
}
document.onkeydown = leDoTeclado;

function MovimentoDoHeroi(movH) {
  switch (movH) {
    case 0:
      xHeroi = xHeroi + 10;
      break;
    case 1:
      yHeroi = yHeroi + 10;
      break;
    case 2:
      xHeroi = xHeroi - 10;
      break;
    case 3:
      yHeroi = yHeroi - 10;
      break;
  }
  AtualizaTela();
}

function MovimentoDoMonstro(mov) {
  let direcao = parseInt((Math.random() * mov) % 4);
  switch (direcao) {
    case 0:
      xMonstro = xMonstro + mov;
      break;
    case 1:
      yMonstro = yMonstro + mov;
      break;
    case 2:
      xMonstro = xMonstro - mov;
      break;
    case 3:
      yMonstro = yMonstro - mov;
      break;
  }
  AtualizaTela();
}

// letiáveis que serão utilizadas para o funcionamento do cronõmetro
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const millisecondsEl = document.querySelector("#milliseconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const resetBtn = document.querySelector("#resetBtn");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = true;
let interval;

startBtn.addEventListener("click", IniciarTempo);
pauseBtn.addEventListener("click", PararTempo);
resumeBtn.addEventListener("click", ContinuarTempo);
resetBtn.addEventListener("click", ResetarTempo);

function IniciarTempo() {
  isPaused = false;

  interval = setInterval(() => {
    milliseconds += 10;

    if (milliseconds === 1000) {
      seconds++;
      milliseconds = 0;
    }

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }

    minutesEl.textContent = FormatarTempo(minutes);
    secondsEl.textContent = FormatarTempo(seconds);
    millisecondsEl.textContent = FormatarMilissegundos(milliseconds);

    if (minutes === 1) {
      alert("O HERÓI MORRE! TENTE!");
      Resetar();
    }
  }, 10);

  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function PararTempo() {
  clearInterval(interval);
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "block";
  isPaused = true;
}

function ContinuarTempo() {
  IniciarTempo();
  isPaused = false;
}

function ResetarTempo() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  isPaused = true;

  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  millisecondsEl.textContent = "000";

  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
}

function FormatarTempo(time) {
  return time < 10 ? `0${time}` : time;
}

function FormatarMilissegundos(time) {
  return time < 100 ? `${time}`.padStart(3, "0") : time;
}
