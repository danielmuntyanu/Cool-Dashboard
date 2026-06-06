import getAccouts from "../api/get-accounts.js";
import addSession from "../api/add-session.js";

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

    console.log(
        `db: ${JSON.stringify(accountList)}\nusername: ${JSON.stringify(username)} password: ${JSON.stringify(password)}`
    );
    
    const findConition = (account) => account.email === username && account.password === password;
    
    if (!accountList.find(findConition)) {
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

        if (username === "" || password === "") {
            throw new Error("* All fields are requiered.")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            throw new Error("* Invalid email address");
        }
        
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("* Password must be at least 8 characters long and contain at least one letter and one number");
        }

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



