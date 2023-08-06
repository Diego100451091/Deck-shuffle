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
let currentTheme = "green";
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

// Observe changes in theme selector
form.addEventListener("change", () => {
  updateColorTheme();
});

menuButton.addEventListener("click", () => {
  toggleMenuOpened();
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

const updateColorTheme = () => {
  const variables = ["", "dark-", "light-"];
  const selectedThemeInput = form.querySelector('input[name="theme"]:checked');
  const selectedTheme = selectedThemeInput.value;

  // Check if the theme has changed
  if (selectedTheme === currentTheme) return; 

  // Update the colors
  for (let variable of variables) {
    document.documentElement.style.setProperty(
      `--${variable}primary-color`,
      `var(--palette-${variable}${selectedTheme})`
    );
  }
  // Update the background
  document.body.classList.toggle(`${currentTheme}-background-pattern`);
  document.body.classList.toggle(`${selectedTheme}-background-pattern`);

  // Save value into localStorage 
  localStorage.setItem("theme", selectedTheme);
  // Set the theme variable to the new theme
  currentTheme = selectedTheme;
  
}

const toggleMenuOpened = () => {
  isMenuOpened = !isMenuOpened;
  console.log(menuContainer)
  if (isMenuOpened){
    console.log("open")
    menuContainer.classList.add("opened");
    return;
  }

  menuContainer.classList.remove("opened");


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
