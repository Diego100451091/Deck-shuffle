// Importamos el deckDict del fichero constants.js
// Importamos el fichero constants.js
import { decksDict } from "./constants/constants.js"
import { Deck } from "./classes/Deck.js"

let languaje = "en";
let deckType = "spanish";
let autoPass = false;
let autoPassPeriod = 2000;
let intervalAutoPassId = null;

const restartButton = document.querySelector("#restart-button");
const passButton = document.querySelector("#pass-button");
const autoPassButton = document.querySelector("#auto-pass-button");

const deck = new Deck(deckType, languaje);

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
