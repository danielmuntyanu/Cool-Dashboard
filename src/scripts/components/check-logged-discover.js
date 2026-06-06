import checkAuth from "./check-auth.js";

const dashboardButtonListener = () => {
    if (!checkAuth()) {
        window.location.href = "./login.html";
    } else {
        window.location.href = "../../index.html";
    }
}

const dashboardButton = document.getElementById("dashboardButton");

dashboardButton.addEventListener("click", dashboardButtonListener);

