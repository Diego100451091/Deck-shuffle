import Deck from "./classes/Deck.js";
import Menu  from "./classes/Menu.js";
import voiceSpeech from "./classes/VoiceSpeech.js";

let autoPass = false;
let autoPassPeriod = 2000;
let intervalAutoPassId = null;
let isMenuOpened = false;
let isPreviousCardsMenuOpened = false;

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

const previousCardsAsideButton = document.querySelector(
  "#previous-cards-button"
);
const previousCardsAside = document.querySelector("#previous-cards-aside");

const deck = new Deck("spanish", "es", voiceSpeech.speakText);

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

previousCardsAsideButton.addEventListener("click", () => {
  togglePreviousCardsAsideOpened();
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

const togglePreviousCardsAsideOpened = () => {
  isPreviousCardsMenuOpened = !isPreviousCardsMenuOpened;
  if (isPreviousCardsMenuOpened) {
    previousCardsAside.classList.add("opened");
    previousCardsAsideButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    return;
  }

  previousCardsAside.classList.remove("opened");
  previousCardsAsideButton.innerHTML = `<img src="src/assets/cards-icon.svg" alt="cards icon">`;
};


const menu = new Menu(deck.setLanguage, deck.setType);
