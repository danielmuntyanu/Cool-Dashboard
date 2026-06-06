const themeSwitch = document.getElementById("themeSwitch");
const themeMenu = document.getElementById("themeMenu");

themeSwitch.addEventListener("click", () => {
    themeMenu.classList.toggle("hidden");
    themeMenu.classList.toggle("flex");
});

// themeMenu.addEventListener("blur", () => {
//     themeMenu.classList.toggle("hidden");
// });

const themeItemLight = document.getElementById("themeItemLight");
const themeItemDark = document.getElementById("themeItemDark");
const themeItemSystem = document.getElementById("themeItemSystem");

const iconLight = !location.href.includes("src") ? "./src/assets/icons/theme-light.svg" : "../assets/icons/theme-light.svg";
const iconDark = !location.href.includes("src") ? "./src/assets/icons/theme-dark.svg" : "../assets/icons/theme-dark.svg";
const iconSystem = !location.href.includes("src") ? "./src/assets/icons/theme-system.svg" : "../assets/icons/theme-system.svg";

if (localStorage.getItem("theme") === "light") {
    themeSwitch.innerHTML = `<img class="icon" src="${iconLight}" />`;
} else if (localStorage.getItem("theme") === "dark") {
    themeSwitch.innerHTML = `<img class="icon" src="${iconDark}" />`;
} else {
    themeSwitch.innerHTML = `<img class="icon" src="${iconSystem}" />`;
}


// Whenever the user explicitly chooses light mode
themeItemLight.addEventListener("click", () => {
    localStorage.theme = "light";
    themeMenu.classList.toggle("hidden");
    themeMenu.classList.toggle("flex");
    location.reload();
});

// Whenever the user explicitly chooses dark mode
themeItemDark.addEventListener("click", () => {
    localStorage.theme = "dark";
    themeMenu.classList.toggle("hidden");
    themeMenu.classList.toggle("flex");
    location.reload();
});

// Whenever the user explicitly chooses to respect the OS preference
themeItemSystem.addEventListener("click", () => {
    localStorage.removeItem("theme");
    themeMenu.classList.toggle("hidden");
    themeMenu.classList.toggle("flex");
    location.reload();
});
