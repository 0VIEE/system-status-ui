document.addEventListener("DOMContentLoaded", function () {
  const bioText = "Class: Solo Developer.\nStatus: Initializing projects...";
  const bioElement = document.getElementById("typewriter");
  const clockElement = document.getElementById("clock");
  const avatar = document.querySelector(".avatar");
  const questStatus = document.getElementById("quest-status");
  const questButtons = document.querySelectorAll(".quest-button");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Use a local placeholder when the original avatar file is not present.
  avatar.addEventListener("error", function () {
    if (avatar.dataset.fallbackApplied === "true") {
      avatar.hidden = true;
      return;
    }

    avatar.dataset.fallbackApplied = "true";
    avatar.src = avatar.dataset.fallback;
  });

  // Type the intro safely without inserting user-controlled HTML.
  function typeBio(index) {
    if (index >= bioText.length) return;

    if (bioText.charAt(index) === "\n") {
      bioElement.appendChild(document.createElement("br"));
    } else {
      bioElement.appendChild(document.createTextNode(bioText.charAt(index)));
    }

    window.setTimeout(function () {
      typeBio(index + 1);
    }, 45);
  }

  if (reducedMotion) {
    bioElement.textContent = bioText;
  } else {
    window.setTimeout(function () {
      typeBio(0);
    }, 350);
  }

  // Create audio only after the visitor interacts with the HUD.
  let audioContext = null;

  function playHoverSound() {
    try {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return;

      if (!audioContext) {
        audioContext = new AudioContextConstructor();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const now = audioContext.currentTime;

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      gainNode.gain.setValueAtTime(0.025, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (error) {
      // Audio is an optional enhancement; the interface works without it.
    }
  }

  questButtons.forEach(function (button) {
    button.addEventListener("pointerenter", playHoverSound);

    button.addEventListener("click", function () {
      const questName = button.dataset.quest || "Unknown quest";

      if (button.dataset.locked === "true") {
        questStatus.textContent = "SYSTEM ERROR: Your level is too low to unlock this quest.";
        questStatus.classList.add("is-error");
        return;
      }

      questStatus.textContent = "QUEST SELECTED: " + questName + ".";
      questStatus.classList.remove("is-error");
    });
  });

  // Update the local clock once per second.
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clockElement.textContent = "[" + hours + ":" + minutes + ":" + seconds + "]";
  }

  updateClock();
  window.setInterval(updateClock, 1000);
});
