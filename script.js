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


/* -----------------------------
   DRAG DISC
----------------------------- */

disc.addEventListener("dragstart", (event) => {
  if (discInserted) return;

  event.dataTransfer.setData("text/plain", "disc");
  display.textContent = "INSERT DISC";
});

slot.addEventListener("dragover", (event) => {
  event.preventDefault();

  if (!discInserted) {
    slot.classList.add("over");
  }
});

slot.addEventListener("dragleave", () => {
  slot.classList.remove("over");
});

slot.addEventListener("drop", (event) => {
  event.preventDefault();

  slot.classList.remove("over");

  if (discInserted) return;

  insertDisc();
});


/* -----------------------------
   MOBILE / TOUCH DISC INSERT
----------------------------- */

disc.addEventListener("click", () => {
  if (!discInserted) {
    insertDisc();
  }
});


/* -----------------------------
   INSERT DISC
----------------------------- */

function insertDisc() {
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


/* -----------------------------
   CREATE VIDEO MENU
----------------------------- */

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


/* -----------------------------
   LOAD VIDEO
----------------------------- */

function loadVideo(index) {
  if (!discInserted) return;

  currentVideo = index;

  menuScreen.style.display = "none";
  videoPlayer.style.display = "block";

  videoPlayer.src = videos[index].src;
  videoPlayer.load();

  display.textContent = videos[index].title;

  document.querySelectorAll(".video-item").forEach((button, i) => {
    button.classList
