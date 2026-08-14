const playBtn = document.getElementById("playBtn");
const record = document.querySelector(".record");
const message = document.getElementById("message");

let playing = false;

playBtn.addEventListener("click", () => {
  playing = !playing;

  if (playing) {
    record.classList.add("playing");
    playBtn.textContent = "⏸ Pause";
    message.textContent =
      "Playing a little piece of our story... ❤️";
  } else {
    record.classList.remove("playing");
    playBtn.textContent = "▶ Play Our Song";
    message.textContent =
      "Every little moment with you means more than you know. ❤️";
  }
});
