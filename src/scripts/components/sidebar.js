
const hamburger = document.getElementById("headerHamburger");
const sidebar = document.querySelector(".sidebar");
const closeButton = document.getElementById("closeSidebarButton");
const galleryButton = document.getElementById('galleryButton');
const listButton = document.getElementById('listButton');


if (window.innerWidth > 768) {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("flex");
} 



hamburger.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        sidebar.classList.remove("hidden");
        sidebar.classList.add("flex");
    }
});

closeButton.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("flex");
    }
});

galleryButton.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("flex");
    }
});

listButton.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("flex");
    }
});
