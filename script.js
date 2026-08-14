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

const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4"
];

let currentVideo = 0;
let insertedDisc = null;


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
   INSERT DVD
========================= */

function insertDVD(dvd) {

  if (insertedDisc) return;

  insertedDisc = dvd;
  currentVideo = Number(dvd.dataset.video);

  const trayBox = discTray.getBoundingClientRect();
  const dvdBox = dvd.getBoundingClientRect();

  const targetX =
    trayBox.left +
    trayBox.width / 2 -
    dvdBox.left -
    dvdBox.width / 2;

  const targetY =
    trayBox.top +
    trayBox.height / 2 -
    dvdBox.top -
    dvdBox.height / 2;

  dvd.style.transition =
    "transform 0.7s ease, opacity 0.7s ease";

  dvd.style.transform =
    `translate(${targetX}px, ${targetY}px) scale(0.65)`;

  discTray.classList.add("disc-loading");

  setTimeout(() => {

    dvd.classList.add("inserted");

    dvd.style.transform = "";

    discInPlayer.style.display = "block";

    playerLight.classList.add("on");

    dvdWelcome.innerHTML = `
      <div class="dvd-text">LOADING...</div>
      <p>Preparing your memory ❤️</p>
    `;

    setTimeout(() => {

      dvdWelcome.style.display = "none";

      videoPlayer.src = videos[currentVideo];
      videoPlayer.style.display = "block";
      videoPlayer.load();

      videoPlayer.play().catch(() => {
        playBtn.textContent = "▶";
      });

    }, 900);

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

    const startX = event.clientX;
    const startY = event.clientY;

    let moved = false;

    dvd.style.zIndex = "1000";
    dvd.style.transition = "none";

    function move(event) {

      const x = event.clientX - startX;
      const y = event.clientY - startY;

      if (Math.abs(x) > 5 || Math.abs(y) > 5) {
        moved = true;
      }

      dvd.style.transform =
        `translate(${x}px, ${y}px) scale(1.08)`;

      const trayBox =
        discTray.getBoundingClientRect();

      const inside =
        event.clientX >= trayBox.left &&
        event.clientX <= trayBox.right &&
        event.clientY >= trayBox.top &&
        event.clientY <= trayBox.bottom;

      if (inside) {
        discTray.classList.add("disc-loading");
      } else {
        discTray.classList.remove("disc-loading");
      }
    }

    function release(event) {

      dvd.releasePointerCapture(event.pointerId);

      dvd.removeEventListener(
        "pointermove",
        move
      );

      dvd.removeEventListener(
        "pointerup",
        release
      );

      discTray.classList.remove("disc-loading");

      const trayBox =
        discTray.getBoundingClientRect();

      const dvdBox =
        dvd.getBoundingClientRect();

      const centerX =
        dvdBox.left + dvdBox.width / 2;

      const centerY =
        dvdBox.top + dvdBox.height / 2;

      const insideTray =
        centerX >= trayBox.left &&
        centerX <= trayBox.right &&
        centerY >= trayBox.top &&
        centerY <= trayBox.bottom;

      dvd.style.zIndex = "";

      if (insideTray && moved) {

        insertDVD(dvd);

      } else {

        dvd.style.transition =
          "transform 0.35s ease";

        dvd.style.transform = "";

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
   NEXT
========================= */

nextBtn.addEventListener("click", () =>
