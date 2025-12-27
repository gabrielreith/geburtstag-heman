// Passwort (für deinen Usecase reicht das)
const CORRECT_PASSWORD = "holzkopp";

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

function unlockIfCorrect() {
  const entered = (input.value || "").trim().toLowerCase();

  if (!entered) {
    setMessage("Bitte Passwort eingeben.", "error");
    return;
  }

  if (entered === CORRECT_PASSWORD) {
    setMessage("Richtig! Song ist freigeschaltet ✅", "ok");
    playerWrap.classList.remove("hidden");

    // Optional: Passwortfeld sperren nach Erfolg
    input.disabled = true;
    btn.disabled = true;

    // Optional: gleich abspielen (Browser kann das blocken, wenn nicht user-initiated)
    // audio.play().catch(() => {});
  } else {
    setMessage("Leider falsch – versuch’s nochmal 👀", "error");
    input.select();
  }
}

btn.addEventListener("click", unlockIfCorrect);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockIfCorrect();
});
