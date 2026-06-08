import getAccouts from "../api/get-accounts.js";
import addSession from "../api/add-session.js";
import { validateLoginForm, findAccount,  } from "./login-utils.js";


const loginForm = document.getElementById("loginForm");
const formUsername = document.getElementById("formUsername");
const formPassword = document.getElementById("formPassword");
const formSubmit = document.getElementById("formSubmit");
const formError = document.getElementById("formError");

function errorMessage (msg) {
    formError.classList.replace("hidden", "block");
    formError.innerText = msg;
}

async function checkAccount (username, password) {
    const accountList = await getAccouts();

    if (!findAccount(accountList, username, password)) {
        errorMessage("* Wrong data entried or account doesn't exist");
        return false;
    } else {
        return true;
    }
}

const formSubmitListener = async () => {
    formError.classList.replace("block", "hidden");

    const username = formUsername.value
    const password = formPassword.value

    try {
        validateLoginForm(username, password);
    } catch (error) {
        errorMessage(`${error.message}`);
        return;
    }

    if (await checkAccount(username, password)) {
        addSession();
        
        window.location.href = "../../index.html";
    } else {
        return;
    }
}

formSubmit.addEventListener("click", formSubmitListener);



