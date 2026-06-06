import removeSession from "../api/remove-session.js";

const logOutButtonListener = async () => {
    const localToken = localStorage.getItem("auth-token");
    if (!localToken) return;

    removeSession(localToken);

    localStorage.removeItem("auth-token");

    window.location.href = "./src/pages/login.html";
}

const logOutButton = document.getElementById("logOutButton");
logOutButton.addEventListener("click", logOutButtonListener);