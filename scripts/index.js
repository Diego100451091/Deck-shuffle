import { Deck } from "./classes/Deck.js";

const synthesis = "speechSynthesis" in window ? window.speechSynthesis : null;
let isVoiceActive = true;

const speakText = (text) => {
  if (synthesis) {
    if (isVoiceActive) {
      const utterance = new SpeechSynthesisUtterance(text);
      synthesis.speak(utterance);
    }
  } else {
    console.log("El navegador no admite la síntesis de voz.");
  }
};

let languaje = "es";
let deckType = "spanish";
let autoPass = false;
let autoPassPeriod = 2000;
let intervalAutoPassId = null;
let isMenuOpened = false;

const restartButton = document.querySelector("#restart-button");
const passButton = document.querySelector("#pass-button");
const autoPassButton = document.querySelector("#auto-pass-button");
const autoPassIntervalInput = document.querySelector(
  "#auto-pass-interval-input"
);
const inputContainer = document.querySelector(".auto-pass-input-container");
const minusButton = inputContainer.querySelector(".minus-button");
const plusButton = inputContainer.querySelector(".plus-button");

const menuButton = document.querySelector("#menu-button");
const menuContainer = document.querySelector("#options-menu");
const voiceButton = document.querySelector("#voice-speech-input");

const deck = new Deck(deckType, languaje, speakText);

passButton.addEventListener("click", () => {
  deck.pass();
});

restartButton.addEventListener("click", () => {
  deck.reset();
  setAutoPass(false);
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



menuButton.addEventListener("click", () => {
  toggleMenuOpened();
});

voiceButton.addEventListener("click", () => {
  updateVoiceSpeechActive();
});

const setAutoPass = async (value) => {
  autoPass = value;
  if (autoPass) {
    autoPassButton.innerHTML = "Stop auto pass";
    autoPassButton.classList.add("active");
    intervalAutoPassId = setTimeout(async () => {
      setAutoPass(await deck.pass());
    }, autoPassPeriod);
  } else {
    autoPassButton.innerHTML = "Start auto pass";
    autoPassButton.classList.remove("active");
    clearInterval(intervalAutoPassId);
  }
};

const updateAutoPassPeriod = () => {
  // Get the new period
  autoPassPeriod = Math.round(autoPassIntervalInput.value * 1000);
  // Restart the autopass process
  if (autoPass) {
    setAutoPass(false);
    setAutoPass(true);
  }
};


const toggleMenuOpened = () => {
  isMenuOpened = !isMenuOpened;
  if (isMenuOpened) {
    menuContainer.classList.add("opened");
    menuButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    return;
  }
  
  menuContainer.classList.remove("opened");
  menuButton.innerHTML = `<i class="fa-solid fa-sliders"></i>`;
};

const updateVoiceSpeechActive = () => {
  isVoiceActive = voiceButton.checked;
  localStorage.setItem("voiceSpeechActive", isVoiceActive);
};



const setInitialVoiceSpeech = () => {
  isVoiceActive = localStorage.getItem("voiceSpeechActive");
  if (isVoiceActive === null) {
    isVoiceActive = true;
  } else if (isVoiceActive === "false") {
    isVoiceActive = false;
  } else {
    isVoiceActive = true;
  }
  voiceButton.checked = isVoiceActive;
};

const setInitialOptions = () => {
  setInitialVoiceSpeech();
};

// Execute initial methods
setInitialOptions();
