import { Deck } from "./classes/Deck.js";

// Función para reproducir un texto con voz
const speakText = (text) => {
  if ("speechSynthesis" in window) {
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  } else {
    console.log("El navegador no admite la síntesis de voz.");
  }
};

let languaje = "es";
let deckType = "spanish";
let autoPass = false;
let autoPassPeriod = 2000;
let intervalAutoPassId = null;

const restartButton = document.querySelector("#restart-button");
const passButton = document.querySelector("#pass-button");
const autoPassButton = document.querySelector("#auto-pass-button");

const deck = new Deck(deckType, languaje, speakText);

passButton.addEventListener("click", () => {
  deck.pass();
});

restartButton.addEventListener("click", () => {
  deck.reset();
});

autoPassButton.addEventListener("click", () => {
  setAutoPass(!autoPass);
});

const setAutoPass = async (value) => {
  autoPass = value;
  if (autoPass) {
    autoPassButton.innerHTML = "Stop auto pass";
    intervalAutoPassId = setTimeout(async () => {
      setAutoPass(await deck.pass());
    }, autoPassPeriod);
  } else {
    autoPassButton.innerHTML = "Start auto pass";
    clearInterval(intervalAutoPassId);
  }
};
