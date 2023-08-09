let currentTheme = "green";
const themeForm = document.querySelector("#color-theme-selector");

// Observe changes in theme selector
themeForm.addEventListener("change", () => {
  updateColorTheme();
});

const updateColorTheme = () => {
  const variables = ["", "dark-", "light-"];
  const selectedThemeInput = themeForm.querySelector(
    'input[name="theme"]:checked'
  );
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
};

const setInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    // Set the theme
    const themeInput = themeForm.querySelector(`input[value="${savedTheme}"]`);
    themeInput.checked = true;
    updateColorTheme();
  }
};

setInitialTheme();
