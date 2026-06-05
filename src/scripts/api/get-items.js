async function getItems() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        } 



        const items = await response.json();

        if (!Array.isArray(items)) {
            throw new Error(`Data is not an array. Wrong data fetched.\nData: ${JSON.stringify(items)}`);
        }

        return items;

    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        return null;
    }
}

export {getItems};