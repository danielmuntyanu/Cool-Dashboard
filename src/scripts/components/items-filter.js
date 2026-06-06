function getFilter () {
    const activeFilter = localStorage.getItem("filter");
    if (!activeFilter) {
        return "ALL";
    } else {
        return activeFilter;
    }

}

function setFilter (filterText) {
    try {
        localStorage.setItem("filter", filterText);
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
}


export function applyFilter(itemsRaw) {
    const activeFilter = getFilter();

    const items = itemsRaw.filter(item => {
        if (activeFilter === "ALL") {
            return true;
        } else {
            return item.name.at(0) === activeFilter ? true : false;
        }
    });

    return items;
}

const filterOptionsList = [
    "ALL", "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
    "S", "T", "U", "V", "W", "X", "Y", "Z"
]

const dashboardFilter = document.getElementById("dashboardFilter");

filterOptionsList.forEach(optionText => {
    dashboardFilter.innerHTML += `
        <div class="filter__item button_icon" id="filter_${optionText}">
            ${optionText}
        </div>
    `;
});

// To activate styles for current filter
const currentFilterText = getFilter();
const currentFilter = document.getElementById(`filter_${currentFilterText}`);
currentFilter.classList.toggle("active");


const filterOptions = document.querySelectorAll(".filter__item");
filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        setFilter(option.innerHTML.trim());
        location.reload();
    });
});
