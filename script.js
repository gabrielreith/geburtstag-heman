const CORRECT_PASSWORD = "holzkopp";

// Bilder unten (Rückseite -> Vorderseite)
const pokeImg = document.getElementById("pokeImg");
const yugiImg = document.getElementById("yugiImg");

// Zielbilder (Vorderseiten)
const POKE_FRONT_SRC = "poke-vor.png";
const YUGI_FRONT_SRC = "yugi-vor.jpeg";

const input = document.getElementById("password");
const btn = document.getElementById("unlockBtn");
const msg = document.getElementById("message");
const playerWrap = document.getElementById("playerWrap");
const audio = document.getElementById("audio");

function setMessage(text, type) {
  msg.textContent = text;
  msg.classList.remove("error", "ok");
  if (type) msg.classList.add(type);
}

function swapImage(imgEl, newSrc) {
  if (!imgEl) return;

  // Falls schon getauscht, nichts machen
  if (imgEl.getAttribute("src") === newSrc) return;

  imgEl.classList.add("swap-out");

  // Nach kurzem Fade: src wechseln, wieder einblenden
  setTimeout(() => {
    imgEl.src = newSrc;
    imgEl.classList.remove("swap-out");
  }, 180);
}

function unlockIfCorrect() {
  const entered = (input.value || "").trim().toLowerCase();

  if (!entered) {
    setMessage("Bitte das Lösungswort eingeben.", "error");
    return;
  }

  if (entered === CORRECT_PASSWORD) {
  setMessage("Richtig! Freigeschaltet ✅", "ok");

  // Bilder tauschen
  swapImage(pokeImg, POKE_FRONT_SRC);
  swapImage(yugiImg, YUGI_FRONT_SRC);

  // Audio anzeigen
  audio.classList.remove("hidden");

  input.disabled = true;
  btn.disabled = true;
  btn.blur();

  // optional: autoplay (Browser kann blocken)
  // audio.play().catch(() => {});
  } else {
    setMessage("Nope 😄 Versuch’s nochmal!", "error");
    input.focus();
    input.select();
  }
}

btn.addEventListener("click", unlockIfCorrect);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockIfCorrect();
});
