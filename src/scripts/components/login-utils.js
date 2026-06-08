export function validateLoginForm(username, password) {
    if (username === "" || password === "") {
        throw new Error("* All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        throw new Error("* Invalid email address");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error("* Password must be at least 8 characters long and contain at least one letter and one number");
    }
}

export function findAccount(accountList, username, password) {
    return accountList.find(
        account => account.email === username && account.password === password
    ) ?? null;
}