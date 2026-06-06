import checkAuth from "./check-auth.js";

if (!checkAuth()) {
    window.location.replace('./src/pages/discover.html');
}