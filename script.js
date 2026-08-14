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


/* =========================
   YOUR VIDEOS
========================= */

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

  if (!page) return;

  if (page1) page1.classList.remove("active");
  if (page2) page2.classList.remove("active");
  if (page3) page3.classList.remove("active");

  page.classList.add("active");
}


if (relationshipBtn) {
  relationshipBtn.addEventListener("click", function () {
    showPage(page2);
  });
}


if (welcomeBtn) {
  welcomeBtn.addEventListener("click", function () {
    showPage(page3);
  });
}


/* =========================
   DVD DRAGGING
========================= */

dvds.forEach(function (dvd) {

  let startX = 0;
  let startY = 0;

  dvd.addEventListener("pointerdown", function (event) {

    if (insertedDisc || dragging || !discTray) return;

    event.preventDefault();

    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    try {
      dvd.setPointerCapture(event.pointerId);
    } catch (error) {}

    dvd.style.transition = "none";
    dvd.style.zIndex = "9999";

    dvd.style.transform =
      "scale(1.08)";
  });


  dvd.addEventListener("pointermove", function (event) {

    if (!dragging || !discTray) return;

    event.preventDefault();

    const x = event.clientX - startX;
    const y = event.clientY - startY;

    dvd.style.transform =
      `translate(${x}px, ${y}px) scale(1.08)`;


    /* Check if DVD is over tray */

    const tray = discTray.getBoundingClientRect();

    const insideTray =
      event.clientX >= tray.left &&
      event.clientX <= tray.right &&
      event.clientY >= tray.top &&
      event.clientY <= tray.bottom;


    if (insideTray) {

      discTray.classList.add("disc-loading");

    } else {

      discTray.classList.remove("disc-loading");

    }

  });


  dvd.addEventListener("pointerup", function (event) {

    if (!dragging) return;

    dragging = false;

    if (!discTray) {

      dvd.style.transform = "";
      dvd.style.zIndex = "";

      return;
    }


    const tray = discTray.getBoundingClientRect();

    const insideTray =
      event.clientX >= tray.left &&
      event.clientX <= tray.right &&
      event.clientY >= tray.top &&
      event.clientY <= tray.bottom;


    discTray.classList.remove("disc-loading");


    try {
      dvd.releasePointerCapture(event.pointerId);
    } catch (error) {}


    if (insideTray) {

      insertDVD(dvd);

    } else {

      dvd.style.transition =
        "transform 0.35s ease";

      dvd.style.transform = "";

      dvd.style.zIndex = "";

    }

  });

});


/* =========================
   INSERT DVD
========================= */

function insertDVD(dvd) {

  if (insertedDisc || !discTray) return;

  insertedDisc = dvd;

  currentVideo =
    Number(dvd.dataset.video || 0);


  /* Find DVD and tray positions */

  const dvdRect =
    dvd.getBoundingClientRect();

  const trayRect =
    discTray.getBoundingClientRect();


  const dvdCenterX =
    dvdRect.left +
    dvdRect.width / 2;

  const dvdCenterY =
    dvdRect.top +
    dvdRect.height / 2;


  const trayCenterX =
    trayRect.left +
    trayRect.width / 2;

  const trayCenterY =
    trayRect.top +
    trayRect.height / 2;


  const moveX =
    trayCenterX - dvdCenterX;

  const moveY =
    trayCenterY - dvdCenterY;


  /* =========================
     ANIMATION 1
     DVD flies to player
  ========================= */

  dvd.style.transition =
    "transform 0.7s cubic-bezier(.2,.8,.2,1)";

  dvd.style.transform =
    `translate(${moveX}px, ${moveY}px) scale(.65)`;


  /* =========================
     ANIMATION 2
     TRAY OPENS
  ========================= */

  setTimeout(function () {

    discTray.classList.add("open");

  }, 600);


  /* =========================
     ANIMATION 3
     DISC ENTERS PLAYER
  ========================= */

  setTimeout(function () {

    dvd.style.opacity = "0";

    if (discInPlayer) {

      discInPlayer.style.display =
        "block";

    }

    discTray.classList.add(
