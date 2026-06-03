const themeSwitch = document.getElementById("themeSwitch");
const themeMenu = document.getElementById("themeMenu");

themeSwitch.addEventListener("click", () => {
    themeMenu.classList.add("active");
});

themeMenu.addEventListener("blur", () => {
    themeMenu.classList.remove("active");
});

const themeItemLight = document.getElementById("themeItemLight");
const themeItemDark = document.getElementById("themeItemDark");
const themeItemSystem = document.getElementById("themeItemSystem");

const iconLight = location.href.includes("index.html") ? "./src/assets/icons/themeLight.svg" : "../assets/icons/themeLight.svg";
const iconDark = location.href.includes("index.html") ? "./src/assets/icons/themeDark.svg" : "../assets/icons/themeDark.svg";
const iconSystem = location.href.includes("index.html") ? "./src/assets/icons/themeSystem.svg" : "../assets/icons/themeSystem.svg";

// Whenever the user explicitly chooses light mode
themeItemLight.addEventListener("click", () => {
    localStorage.theme = "light";
    themeMenu.classList.remove("active");
    themeSwitch.innerHTML = `<img class="theme-switch__icon" src="${iconLight}"`
});

// Whenever the user explicitly chooses dark mode
themeItemDark.addEventListener("click", () => {
    localStorage.theme = "dark";
    themeMenu.classList.remove("active");
    themeSwitch.innerHTML = `<img class="theme-switch__icon" src="${iconDark}"`
});

// Whenever the user explicitly chooses to respect the OS preference
themeItemSystem.addEventListener("click", () => {
    localStorage.removeItem("theme");
    themeMenu.classList.remove("active");
    themeSwitch.innerHTML = `<img class="theme-switch__icon" src="${iconSystem}"`
});
