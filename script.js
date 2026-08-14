const videos = [
  {
    title: "Let's Have a Look at Our Relationship ❤️",
    src: "videos/video1.mp4"
  },
  {
    title: "Another Little Memory 🥹",
    src: "videos/video2.mp4"
  },
  {
    title: "Us ❤️",
    src: "videos/video3.mp4"
  }
];

const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");
const videoList = document.getElementById("videoList");
const welcome = document.getElementById("welcome");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentVideo = 0;

function loadVideo(index) {
  currentVideo = index;

  videoPlayer.src = videos[index].src;
  videoTitle.textContent = videos[index].title;

  welcome.style.display = "none";
  videoPlayer.style.display = "block";

  document.querySelectorAll(".video-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  videoPlayer.load();
}

videos.forEach((video, index) => {
  const button = document.createElement("button");

  button.className = "video-item";
  button.textContent = video.title;

  button.addEventListener("click", () => {
    loadVideo(index);
  });

  videoList.appendChild(button);
});

playBtn.addEventListener("click", () => {
  if (!videoPlayer.src) return;

  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.textContent = "⏸";
  } else {
    videoPlayer.pause();
    playBtn.textContent = "▶";
  }
});

prevBtn.addEventListener("click", () => {
  const previous =
    (currentVideo - 1 + videos.length) % videos.length;

  loadVideo(previous);
});

nextBtn.addEventListener("click", () => {
  const next =
    (currentVideo + 1) % videos.length;

  loadVideo(next);
});

videoPlayer.addEventListener("ended", () => {
  const next =
    (currentVideo + 1) % videos.length;

  loadVideo(next);
});
