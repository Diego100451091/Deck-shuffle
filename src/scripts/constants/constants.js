import { spanishDeck40, spanishDeck48 } from "./spanishDeck.js";
import {
  poker40Deck,
  poker52Deck,
  poker40jokerDeck,
  poker52JockerDeck,
} from "./pokerDecks.js";

const decksDict = {
  spanish40: {
    list: spanishDeck40,
    reverse: "spanishDeck/reverse.jpg",
  },
  spanish48: {
    list: spanishDeck48,
    reverse: "spanishDeck/reverse.jpg",
  },
  poker40: {
    list: poker40Deck,
    reverse: "pokerDeck/reverse.jpg",
  },
  poker52: {
    list: poker52Deck,
    reverse: "pokerDeck/reverse.jpg",
  },
  poker40joker: {
    list: poker40jokerDeck,
    reverse: "pokerDeck/reverse.jpg",
  },
  poker52joker: {
    list: poker52JockerDeck,
    reverse: "pokerDeck/reverse.jpg",
  },
};

export { decksDict };
