import checkAuth from "./check-auth.js";

const dashboardButtonListener = () => {
    if (!checkAuth()) {
        window.location.replace("./login.html");
    } else {
        window.location.replace("../../index.html");
    }
}

const dashboardButton = document.getElementById("dashboardButton");

dashboardButton.addEventListener("click", dashboardButtonListener);

