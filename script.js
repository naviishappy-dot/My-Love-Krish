/* =========================
   ELEMENTS
========================= */

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
   EXACT VIDEO FILES
========================= */

const videos = [
  "video1.mp4",
  "VID_20260814_150026_664.mp4",
  "VID_20260814_144552_758.mp4",
  "VID_20260814_140449_986.mp4"
];


let insertedDisc = null;
let currentVideo = 0;
let dragging = false;


/* =========================
   DVD DRAGGING
========================= */

dvds.forEach((dvd) => {

  let startX = 0;
  let startY = 0;

  dvd.addEventListener("pointerdown", (event) => {

    if (insertedDisc || dragging) return;

    event.preventDefault();

    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    try {
      dvd.setPointerCapture(event.pointerId);
    } catch (error) {}

    dvd.style.transition = "none";
    dvd.style.zIndex = "9999";
    dvd.style.transform = "scale(1.08)";
  });


  dvd.addEventListener("pointermove", (event) => {

    if (!dragging) return;

    event.preventDefault();

    const x = event.clientX - startX;
    const y = event.clientY - startY;

    dvd.style.transform =
      `translate(${x}px, ${y}px) scale(1.08)`;


    if (!discTray) return;

    const tray =
      discTray.getBoundingClientRect();

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


  dvd.addEventListener("pointerup", (event) => {

    if (!dragging) return;

    dragging = false;

    if (!discTray) {
      resetDVD(dvd);
      return;
    }

    const tray =
      discTray.getBoundingClientRect();

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
      resetDVD(dvd);
    }

  });

});


/* =========================
   RESET DVD
========================= */

function resetDVD(dvd) {

  dvd.style.transition =
    "transform .35s ease";

  dvd.style.transform = "";

  dvd.style.zIndex = "";

}


/* =========================
   INSERT DVD
========================= */

function insertDVD(dvd) {

  if (insertedDisc || !discTray) return;

  insertedDisc = dvd;

  currentVideo =
    Number(dvd.dataset.video || 0);


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


  /* DVD moves toward tray */

  dvd.style.transition =
    "transform .7s cubic-bezier(.2,.8,.2,1)";

  dvd.style.transform =
    `translate(${moveX}px, ${moveY}px) scale(.65)`;


  /* Tray opens */

  setTimeout(() => {

    discTray.classList.add("open");

  }, 650);


  /* Disc enters */

  setTimeout(() => {

    dvd.style.opacity = "0";

    if (discInPlayer) {
      discInPlayer.style.display = "block";
    }

    discTray.classList.add("disc-inserted");

    if (playerLight) {
      playerLight.classList.add("on");
    }

  }, 1100);


  /* Tray closes */

  setTimeout(() => {

    discTray.classList.remove("open");

  }, 1900);


  /* Loading */

  setTimeout(() => {

    if (!dvdWelcome) return;

    dvdWelcome.innerHTML = `
      <div class="dvd-text">
        LOADING...
      </div>

      <p>
        Preparing your memory ❤️
      </p>
    `;

    dvdWelcome.style.display = "flex";

  }, 2100);


  /* Play selected video */

  setTimeout(() => {

    if (!videoPlayer) return;

    if (dvdWelcome) {
      dvdWelcome.style.display = "none";
    }


    const selectedVideo =
      videos[currentVideo];


    videoPlayer.src =
      selectedVideo;

    videoPlayer.style.display =
      "block";

    videoPlayer.load();


    videoPlayer.play().catch(() => {

      if (playBtn) {
        playBtn.textContent = "▶";
      }

    });

  }, 3000);

}


/* =========================
   PLAY / PAUSE
========================= */

if (playBtn) {

  playBtn.addEventListener("click", () => {

    if (!insertedDisc || !videoPlayer)
      return;


    if (videoPlayer.paused) {

      videoPlayer.play();

      playBtn.textContent = "⏸";

    } else {

      videoPlayer.pause();

      playBtn.textContent = "▶";

    }

  });

}


/* =========================
   NEXT VIDEO
========================= */

if (nextBtn) {

  nextBtn.addEventListener("click", () => {

    if (!insertedDisc || !videoPlayer)
      return;


    currentVideo =
      (currentVideo + 1) %
      videos.length;


    videoPlayer.src =
      videos[currentVideo];

    videoPlayer.load();

    videoPlayer.play().catch(() => {});

  });

}


/* =========================
   PREVIOUS VIDEO
========================= */

if (prevBtn) {

  prevBtn.addEventListener("click", () => {

    if (!insertedDisc || !videoPlayer)
      return;


    currentVideo =
      (currentVideo - 1 + videos.length) %
      videos.length;


    videoPlayer.src =
      videos[currentVideo];

    videoPlayer.load();

    videoPlayer.play().catch(() => {});

  });

}


/* =========================
   EJECT
========================= */

if (ejectBtn) {

  ejectBtn.addEventListener("click", () => {

    if (!insertedDisc) return;


    if (videoPlayer) {

      videoPlayer.pause();

      videoPlayer.removeAttribute("src");

      videoPlayer.load();

      videoPlayer.style.display = "none";

    }


    if (dvdWelcome) {

      dvdWelcome.innerHTML = `
        <div class="dvd-text">
          DVD
        </div>

        <p>
          Please insert a disc
        </p>
      `;

      dvdWelcome.style.display = "flex";

    }


    if (discTray) {

      discTray.classList.remove("open");

      discTray.classList.remove(
        "disc-inserted"
      );

    }


    if (discInPlayer) {

      discInPlayer.style.display =
        "none";

    }


    if (playerLight) {

      playerLight.classList.remove("on");

    }


    insertedDisc.style.opacity = "1";

    insertedDisc.style.transition =
      "transform .5s ease";

    insertedDisc.style.transform = "";

    insertedDisc.style.zIndex = "";


    insertedDisc = null;

    currentVideo = 0;


    if (playBtn) {
      playBtn.textContent = "▶";
    }

  });

}
