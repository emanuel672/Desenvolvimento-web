const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    // Redefinindo todos os itens de navegação para o estado padrão
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    // Definindo o item de navegação clicado como ativo
    navItem.className = "nav-item active";
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    // Iniciando a ação de arrastar
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    // Movendo o contêiner horizontalmente com base no movimento do mouse
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    // Finalizando a ação de arrastar
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    // Finalizando a ação de arrastar quando o mouse deixa o contêiner
    isDragging = false;
  });
});

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

// Array de músicas com seus detalhes
const songs = [
  {
    title: "Redemption",
    name: "Besomorph & Coopex",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Besomorph-Coopex-Redemption.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/398875d0-9b9e-494a-8906-210aa3f777e0",
  },
  {
    title: "What's The Problem?",
    name: "OSKI",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/OSKI-Whats-The-Problem.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/810d1ddc-1168-4990-8d43-a0ffee21fb8c",
  },
  {
    title: "Control",
    name: "Unknown Brain x Rival",
    source:
      "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Unknown-BrainxRival-Control.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
];

let currentSongIndex = 0;

// Função para iniciar a rotação da imagem
function startRotation() {
  if (!rotating) {
    rotating = true;
    rotationInterval = setInterval(rotateImage, 50);
  }
}

// Função para pausar a rotação da imagem
function pauseRotation() {
  clearInterval(rotationInterval);
  rotating = false;
}

// Função para rotacionar a imagem
function rotateImage() {
  currentRotation += 1;
  rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

// Função para atualizar as informações da música na interface do usuário
function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  rotatingImage.src = songs[currentSongIndex].cover;

  song.addEventListener("loadeddata", function () {});
}

// Evento ouvinte para quando os metadados da música são carregados
song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

// Evento ouvinte para quando a música termina
song.addEventListener("ended", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

// Evento ouvinte para a atualização do tempo da música
song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

// Função para reproduzir ou pausar a música
function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  } else {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
    pauseRotation();
  }
}

// Evento ouvinte para clique no botão de reproduzir/pausar
playPauseButton.addEventListener("click", playPause);

// Evento ouvinte para a mudança de entrada de progresso
progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

// Evento ouvinte para a mudança de progresso (quando o usuário libera a barra de progresso)
progress.addEventListener("change", function () {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
  startRotation();
});

// Evento ouvinte para clique no botão de avançar
forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

// Evento ouvinte para clique no botão de retroceder
backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

// Inicializando as informações da música
updateSongInfo();

// Inicializando a instância do Swiper
var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  // Evento ouvinte para clicar em um slide
  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});