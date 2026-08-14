const disc = document.getElementById("disc");
const slot = document.getElementById("slot");

const welcomeScreen = document.getElementById("welcomeScreen");
const menuScreen = document.getElementById("menuScreen");
const videoPlayer = document.getElementById("videoPlayer");
const videoList = document.getElementById("videoList");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const ejectBtn = document.getElementById("ejectBtn");
const display = document.getElementById("display");

const videos = [
  {
    title: "Memory 01 ❤️",
    src: "videos/video1.mp4"
  },
  {
    title: "Memory 02 🥹",
    src: "videos/video2.mp4"
  },
  {
    title: "Memory 03 ❤️",
    src: "videos/video3.mp4"
  }
];

let discInserted = false;
let currentVideo = 0;

function insertDisc() {
  if (discInserted) return;

  discInserted = true;

  disc.classList.add("inserted");
  slot.textContent = "DISC INSERTED";
  display.textContent = "READING DISC...";

  setTimeout(() => {
    welcomeScreen.style.display = "none";
    menuScreen.style.display = "flex";
    display.textContent = "NAVI × KRISH — READY";
    createVideoButtons();
  }, 1200);
}

/* PHONE: TAP DISC */
disc.addEventListener("click", insertDisc);

/* COMPUTER: DRAG DISC */
disc.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", "disc");
});

slot.addEventListener("dragover", (event) => {
  event.preventDefault();
  slot.classList.add("over");
});

slot.addEventListener("dragleave", () => {
  slot.classList.remove("over");
});

slot.addEventListener("drop", (event) => {
  event.preventDefault();
  slot.classList.remove("over");
  insertDisc();
});

function createVideoButtons() {
  videoList.innerHTML = "";

  videos.forEach((video, index) => {
    const button = document.createElement("button");

    button.className = "video-item";
    button.textContent = video.title;

    button.addEventListener("click", () => {
      loadVideo(index);
    });

    videoList.appendChild(button);
  });
}

function loadVideo(index) {
  if (!discInserted) return;

  currentVideo = index;

  menuScreen.style.display = "none";
  videoPlayer.style.display = "block";

  videoPlayer.src = videos[index].src;
  videoPlayer.load();

  display.textContent = videos[index].title;
}

playBtn.addEventListener("click", () => {
  if (!discInserted) return;

  if (!videoPlayer.src) {
    loadVideo(currentVideo);
  }

  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.textContent = "⏸";
  } else {
    videoPlayer.pause();
    playBtn.textContent = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  if (!discInserted) return;

  currentVideo = (currentVideo + 1) % videos.length;
  loadVideo(currentVideo);
});

prevBtn.addEventListener("click", () => {
  if (!discInserted) return;

  currentVideo = (currentVideo - 1 + videos.length) % videos.length;
  loadVideo(currentVideo);
});

ejectBtn.addEventListener("click", () => {
  if (!discInserted) return;

  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  videoPlayer.style.display = "none";
  menuScreen.style.display = "none";
  welcomeScreen.style.display = "flex";

  disc.classList.remove("inserted");

  slot.textContent = "INSERT DISC";
  display.textContent = "NO DISC";

  playBtn.textContent = "▶";
  discInserted = false;
});
