const CORRECT_PASSWORD = "holzkopp";

const pokeImg = document.getElementById("pokeImg");
const yugiImg = document.getElementById("yugiImg");
const audio = document.getElementById("audio");

const POKE_FRONT_SRC = "poke-vor.png";
const YUGI_FRONT_SRC = "yugi-vor.jpeg";

const input = document.getElementById("password");
const btn = document.getElementById("unlockBtn");
const msg = document.getElementById("message");

let isUnlocked = false;

function setMessage(text, type) {
  msg.textContent = text;
  msg.classList.remove("error", "ok");
  if (type) msg.classList.add(type);
}

function swapImage(imgEl, newSrc) {
  if (!imgEl) return;
  if (imgEl.getAttribute("src") === newSrc) return;

  imgEl.classList.add("swap-out");
  setTimeout(() => {
    imgEl.src = newSrc;
    imgEl.classList.remove("swap-out");
  }, 180);
}

function enableCardFlips() {
  // Pokémon-Karte: Klick -> umdrehen
  if (pokeImg) {
    pokeImg.addEventListener("click", () => {
      if (!isUnlocked) return;
      swapImage(pokeImg, POKE_FRONT_SRC);
    });
  }

  // Yu-Gi-Oh-Karte: Klick -> umdrehen + Audio zeigen
  if (yugiImg) {
    yugiImg.addEventListener("click", () => {
      if (!isUnlocked) return;
      swapImage(yugiImg, YUGI_FRONT_SRC);

      // Audio erst zeigen, wenn er die Karte wirklich "umdreht"
      audio.classList.remove("hidden");
    });
  }
}

function unlockIfCorrect() {
  const entered = (input.value || "").trim().toLowerCase();

  if (!entered) {
    setMessage("Bitte das Lösungswort eingeben.", "error");
    return;
  }

  if (entered === CORRECT_PASSWORD) {
    isUnlocked = true;
    setMessage("Richtig! Jetzt kannst du die Karten antippen, um sie umzudrehen 👇", "ok");

    input.disabled = true;
    btn.disabled = true;
    btn.blur();

    // erst ab jetzt ist Klicken sinnvoll
    enableCardFlips();
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
