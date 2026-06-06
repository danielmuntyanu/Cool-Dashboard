export default async function getAccounts () {
    try {

        const response = await fetch("../database/accounts.json");

        if (!response.ok) {
            throw new Error("Error: failed to fetch accounts")
        }

        const data = await response.json();

        if ("accounts" in data) {
            return data.accounts;
        } else {
            throw new Error(`Error: Wrong data fetched - data: ${data}`);
        }

    } catch (error) {
        console.error(error);
    }
}