import getSessions from "../api/get-sessions.js";

function checkToken (token) {
    if (!token) {
        return false;
    } 
    
    const sessions = getSessions();

    if (sessions.includes(token)) {
        return true;
    } else {
        return false;
    }
}

export default function checkAuth () {
    const localToken = localStorage.getItem("auth-token");

    const isValid = checkToken(localToken);

    return isValid;
}




