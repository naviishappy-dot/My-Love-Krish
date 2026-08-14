const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const relationshipBtn = document.getElementById("relationshipBtn");
const welcomeBtn = document.getElementById("welcomeBtn");

const dvds = document.querySelectorAll(".dvd");
const discTray = document.querySelector(".disc-tray");
const discInPlayer = document.getElementById("discInPlayer");

const dvdWelcome = document.getElementById("dvdWelcome");
const videoPlayer = document.getElementById("videoPlayer");

const playerLight = document.getElementById("playerLight");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const ejectBtn = document.getElementById("ejectBtn");


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page) {
  page1.classList.remove("active");
  page2.classList.remove("active");
  page3.classList.remove("active");

  page.classList.add("active");
}

relationshipBtn.addEventListener("click", () => {
  showPage(page2);
});

welcomeBtn.addEventListener("click", () => {
  showPage(page3);
});


/* =========================
   VIDEO FILES
========================= */

const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4"
];

let currentVideo = 0;
let insertedDisc = null;


/* =========================
   INSERT DVD
========================= */

function insertDVD(dvd) {

  if (insertedDisc) return;

  insertedDisc = dvd;

  currentVideo = Number(dvd.dataset.video);

  dvd.classList.add("inserted");

  discInPlayer.style.display = "block";

  dvdWelcome.style.display = "none";

  playerLight.classList.add("on");

  videoPlayer.src = videos[currentVideo];

  videoPlayer.load();

  setTimeout(() => {

    videoPlayer.style.display = "block";

    videoPlayer.play().catch(() => {
      // Browser may block autoplay.
    });

  }, 700);
}


/* =========================
   TOUCH DRAG
========================= */

dvds.forEach((dvd) => {

  dvd.addEventListener("pointerdown", (event) => {

    if (insertedDisc) return;

    event.preventDefault();

    dvd.setPointerCapture(event.pointerId);

    const originalTransform =
      dvd.style.transform;

    let moved = false;

    function move(event) {

      moved = true;

      dvd.style.position = "fixed";

      dvd.style.zIndex = "1000";

      dvd.style.left =
        `${event.clientX - dvd.offsetWidth / 2}px`;

      dvd.style.top =
        `${event.clientY - dvd.offsetHeight / 2}px`;

    }

    function release(event) {

      dvd.releasePointerCapture(
        event.pointerId
      );

      dvd.removeEventListener(
        "pointermove",
        move
      );

      dvd.removeEventListener(
        "pointerup",
        release
      );

      const tray =
        discTray.getBoundingClientRect();

      const dvdBox =
        dvd.getBoundingClientRect();

      const centerX =
        dvdBox.left + dvdBox.width / 2;

      const centerY =
        dvdBox.top + dvdBox.height / 2;

      const insideTray =
        centerX >= tray.left &&
        centerX <= tray.right &&
        centerY >= tray.top &&
        centerY <= tray.bottom;

      dvd.style.position = "";
      dvd.style.left = "";
      dvd.style.top = "";
      dvd.style.zIndex = "";

      dvd.style.transform =
        originalTransform;

      if (insideTray && moved) {

        insertDVD(dvd);

      }
    }

    dvd.addEventListener(
      "pointermove",
      move
    );

    dvd.addEventListener(
      "pointerup",
      release
    );

  });

});


/* =========================
   PLAY / PAUSE
========================= */

playBtn.addEventListener("click", () => {

  if (!insertedDisc) return;

  if (videoPlayer.paused) {

    videoPlayer.play();

    playBtn.textContent = "⏸";

  } else {

    videoPlayer.pause();

    playBtn.textContent = "▶";

  }

});


/* =========================
   NEXT VIDEO
========================= */

nextBtn.addEventListener("click", () => {

  if (!insertedDisc) return;

  currentVideo =
    (currentVideo + 1) % videos.length;

  videoPlayer.src =
    videos[currentVideo];

  videoPlayer.load();

  videoPlayer.play().catch(() => {});

});


/* =========================
   PREVIOUS VIDEO
========================= */

prevBtn.addEventListener("click", () => {

  if (!insertedDisc) return;

  currentVideo =
    (currentVideo - 1 + videos.length)
    % videos.length;

  videoPlayer.src =
    videos[currentVideo];

  videoPlayer.load();

  videoPlayer.play().catch(() => {});

});


/* =========================
   EJECT
========================= */

ejectBtn.addEventListener("click", () => {

  if (!insertedDisc) return;

  videoPlayer.pause();

  videoPlayer.removeAttribute("src");

  videoPlayer.load();

  videoPlayer.style.display = "none";

  dvdWelcome.style.display = "flex";

  discInPlayer.style.display = "none";

  playerLight.classList.remove("on");

  insertedDisc.classList.remove("inserted");

  insertedDisc = null;

  playBtn.textContent = "▶";

});
