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
const autoPassIntervalInput = document.querySelector(
  "#auto-pass-interval-input"
);
const inputContainer = document.querySelector(".auto-pass-input-container");
const minusButton = inputContainer.querySelector(".minus-button");
const plusButton = inputContainer.querySelector(".plus-button");

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

minusButton.addEventListener("click", () => {
  autoPassIntervalInput.stepDown();
  updateAutoPassPeriod();
});

plusButton.addEventListener("click", () => {
  autoPassIntervalInput.stepUp();
  updateAutoPassPeriod();
});

autoPassIntervalInput.addEventListener("change", () => {
  updateAutoPassPeriod();
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

const updateAutoPassPeriod = () => {
  console.log(autoPassIntervalInput.value)
  autoPassPeriod = autoPassIntervalInput.value;
  if (autoPass) {
    setAutoPass(false);
    setAutoPass(true);
  }
};
