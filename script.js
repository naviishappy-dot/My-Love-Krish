const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const relationshipBtn = document.getElementById("relationshipBtn");
const welcomeBtn = document.getElementById("welcomeBtn");

function showPage(pageToShow) {
  page1.classList.remove("active");
  page2.classList.remove("active");
  page3.classList.remove("active");

  pageToShow.classList.add("active");
}

relationshipBtn.addEventListener("click", () => {
  showPage(page2);
});

welcomeBtn.addEventListener("click", () => {
  showPage(page3);
});
