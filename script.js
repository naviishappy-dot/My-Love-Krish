const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const relationshipBtn = document.getElementById("relationshipBtn");
const welcomeBtn = document.getElementById("welcomeBtn");

const dvds = document.querySelectorAll(".dvd");
const discTray = document.getElementById("discTray");
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

let insertedDisc = null;
let currentVideo = 0;
let dragging = false;


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page) {
  page1.classList.remove("active");
  page2.classList.remove("active");
  page3.classList.remove("active");

  page.classList.add("active");
}

relationshipBtn.onclick = () => showPage(page2);
welcomeBtn.onclick = () => showPage(page3);


/* =========================
   DVD DRAGGING
========================= */

dvds.forEach((dvd) => {

  let startX = 0;
  let startY = 0;

  dvd.addEventListener("pointerdown", (e) => {

    if (insertedDisc || dragging) return;

    e.preventDefault();

    dragging = true;

    startX = e.clientX;
    startY = e.clientY;

    dvd.setPointerCapture(e.pointerId);

    dvd.style.transition = "none";
    dvd.style.zIndex = "9999";
    dvd.style.transform = "scale(1.08)";
  });


  dvd.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    e.preventDefault();

    const x = e.clientX - startX;
    const y = e.clientY - startY;

    dvd.style.transform =
      `translate(${x}px, ${y}px) scale(1.08)`;

    const tray = discTray.getBoundingClientRect();

    const inside =
      e.clientX > tray.left &&
      e.clientX < tray.right &&
      e.clientY > tray.top &&
      e.clientY < tray.bottom;

    if (inside) {
      discTray.classList.add("disc-loading");
    } else {
      discTray.classList.remove("disc-loading");
    }
  });


  dvd.addEventListener("pointerup", (e) => {

    if (!dragging) return;

    dragging = false;

    const tray = discTray.getBoundingClientRect();

    const inside =
      e.clientX > tray.left &&
      e.clientX < tray.right &&
      e.clientY > tray.top &&
      e.clientY < tray.bottom;

    discTray.classList.remove("disc-loading");

    dvd.releasePointerCapture(e.pointerId);

    if (inside) {

      insertDVD(dvd);

    } else {

      dvd.style.transition =
        "transform .35s ease";

      dvd.style.transform = "";

      dvd.style.zIndex = "";
    }
  });

});


/* =========================
   INSERT DVD
========================= */

function insertDVD(dvd) {

  if (insertedDisc) return;

  insertedDisc = dvd;
  currentVideo = Number(dvd.dataset.video);

  const dvdRect = dvd.getBoundingClientRect();
  const trayRect = discTray.getBoundingClientRect();

  const moveX =
   
