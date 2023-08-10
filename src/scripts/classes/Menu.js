class Menu {
  constructor(
    callbackLanguageChange,
    callbackDeckChange,
  ) {
    this.callbackLanguageChange = callbackLanguageChange;
    this.callbackDeckChange = callbackDeckChange;

    this.language = this._setInitialLanguage();
    this.deckType = this._setInitialDeck();
    this.currentTheme = this._setInitialTheme();

    document
      .querySelector("#language-selector")
      .addEventListener("change", () => {
        this._onLanguageSelectorChange();
      });
    document.querySelector("#deck-selector").addEventListener("change", () => {
      this._onDeckSelectorChange();
    });
    document
      .querySelector("#color-theme-selector")
      .addEventListener("change", () => {
        this._onColorThemeChange();
      });
  }

  _onLanguageSelectorChange = () => {
    this.language = document.querySelector("#language-selector").value;
    localStorage.setItem("languageSelected", this.language);
    this.callbackLanguageChange(this.language);
  };

  _onDeckSelectorChange = () => {
    this.deckType = document.querySelector("#deck-selector").value;
    localStorage.setItem("deckSelected", this.deckType);
    this.callbackDeckChange(this.deckType);
  };


  _setInitialLanguage = () => {
    const language = localStorage.getItem("languageSelected") ?? "es";
    document.querySelector("#language-selector").value = language;
    this.callbackLanguageChange(language)
    return language;
  };

  _setInitialDeck = () => {
    const deckType = localStorage.getItem("deckSelected") ?? "spanish";
    document.querySelector("#deck-selector").value = deckType;
    this.callbackDeckChange(deckType);
    return deckType;
  };

  _setInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme") ?? "green";
    const themeInput = document
      .querySelector("#color-theme-selector")
      .querySelector(`input[value="${savedTheme}"]`);
    themeInput.checked = true;
    this._onColorThemeChange();
  };

  _onColorThemeChange = () => {
    const variables = ["", "dark-", "light-"];
    const selectedThemeInput = document
      .querySelector("#color-theme-selector")
      .querySelector('input[name="theme"]:checked');
    const selectedTheme = selectedThemeInput.value;

    // Check if the theme has changed
    if (selectedTheme === this.currentTheme) return;

    // Update the colors
    for (let variable of variables) {
      document.documentElement.style.setProperty(
        `--${variable}primary-color`,
        `var(--palette-${variable}${selectedTheme})`
      );
    }
    // Update the background
    document.body.classList = `${selectedTheme}-background-pattern`;

    // Update the page logo
    document.querySelector("#page-logo").href = `src/assets/${selectedTheme}-cards-icon.svg`;

    // Save value into localStorage
    localStorage.setItem("theme", selectedTheme);
    // Set the theme variable to the new theme
    this.currentTheme = selectedTheme;
  };
}

export default Menu;
