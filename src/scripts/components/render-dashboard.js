import { getItems } from "./src/scripts/api/get-items.js"
import { applyFilter } from "./src/scripts/components/items-filter.js";

const dashboardFilter = document.getElementById('dashboardFilter');

const dashboardGallery = document.getElementById('dashboardGallery');
const dashboardList = document.getElementById('dashboardList');
const dashboardEmpty = document.getElementById('dashboardEmpty');

const galleryButton = document.getElementById('galleryButton');
const listButton = document.getElementById('listButton');


function renderGallery (itemsRaw) {
    const items = applyFilter(itemsRaw);
    if (items.length === 0) {
        dashboardEmpty.classList.replace("hidden", "flex");
        return
    } else {
        dashboardEmpty.classList.replace("flex", "hidden");
    }

    items.forEach((item) => {
        dashboardGallery.innerHTML += `
            <div class="card">
                <div class="letter_square">
                    ${item.name.at(0).toUpperCase()}
                </div>
                
                <h3>
                    ${item.name}
                </h3>

                <!-- ADD ELEMENTS HERE -->
                
            </div>
        `
    });
}

function renderList (itemsRaw) {
    const items = applyFilter(itemsRaw);
    if (items.length === 0) {
        dashboardEmpty.classList.replace("hidden", "flex");
        return
    } else {
        dashboardEmpty.classList.replace("flex", "hidden");
    }

    items.forEach((item) => {
        dashboardGallery.innerHTML += `
            <div class="list_item">
                
                <h3>
                    ${item.name}
                </h3>

                <!-- ADD ELEMENTS HERE -->
                
            </div>
        `
    });
}

listButton.addEventListener("click", () => {
    dashboardGallery.classList.add("hidden");
    dashboardGallery.classList.remove("grid");
    dashboardGallery.innerHTML = ``

    dashboardList.classList.add("grid");
    dashboardList.classList.remove("hidden")
    renderList(getItems());
});

galleryButton.addEventListener("click", () => {
    dashboardList.classList.remove("grid");
    dashboardList.classList.add("hidden");
    dashboardList.innerHTML = ``

    dashboardGallery.classList.remove("hidden");
    dashboardGallery.classList.add("grid")
    renderGallery(getItems());

});