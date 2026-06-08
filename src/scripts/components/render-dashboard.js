import getItems from "../api/get-items.js"
import { applyFilter } from "./items-filter.js";

const dashboardFilter = document.getElementById('dashboardFilter');

const dashboardGallery = document.getElementById('dashboardGallery');
const dashboardList = document.getElementById('dashboardList');
const dashboardListBody = document.getElementById('dashboardListBody');
const dashboardEmpty = document.getElementById('dashboardEmpty');
const dashboardError = document.getElementById('dashboardError');

const galleryButton = document.getElementById('galleryButton');
const listButton = document.getElementById('listButton');


function renderGallery (itemsRaw) {
    const items = applyFilter(itemsRaw);
    if (items.length === 0) {
        dashboardEmpty.classList.replace("hidden", "flex");
        dashboardGallery.classList.replace("grid", "hidden");
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

                <article>
                    <p>
                        <b>Email:</b><br/>
                        ${item.email}
                    </p>
                    <p>
                        <b>Address:</b> <br/>
                        <div class="address__card">
                            <b>Street</b>: ${item.address.street}, <br/>
                            <b>Suite</b>: ${item.address.suite}, <br/>
                            <b>City</b>: ${item.address.city}, <br/> 
                            <b>Zipcode</b>: ${item.address.zipcode}
                        </div>
                    </p>

                </article>

                <a class="gallery__button" href="mailto:${item.email}">
                    <div class="button_action">Send Email</div>
                </a>

            </div>
        `
    });
}

function renderList (itemsRaw) {
    const items = applyFilter(itemsRaw);
    if (items.length === 0) {
        dashboardEmpty.classList.replace("hidden", "flex");
        dashboardList.classList.replace("grid", "hidden");
        return;
    } else {
        dashboardEmpty.classList.replace("flex", "hidden");
    }

    items.forEach((item) => {
        dashboardListBody.innerHTML += `
            <tr class="list_item">
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><a href="mailto:${item.email}">${item.email.split("@")[0] + " @" + item.email.split("@")[1]}</a></td>
                <td>${item.address.zipcode},
                ${item.address.city},<br/>
                ${item.address.street},
                ${item.address.suite}</td>
            </tr>
        `
    });

    console.log(dashboardListBody.innerHTML);
}

const galleryButtonListener = async () => {
    const rawItems = await getItems();
    if (!rawItems) {
        dashboardError.classList.replace("hidden", "flex");
        return;
    } else {
        dashboardError.classList.replace("flex", "hidden");
    }

    localStorage.setItem("view", "gallery")
    
    galleryButton.classList.add("active");
    listButton.classList.remove("active");


    dashboardList.classList.remove("flex");
    dashboardList.classList.add("hidden");
    dashboardListBody.innerHTML = ``

    dashboardGallery.classList.remove("hidden");
    dashboardGallery.classList.add("grid")

    renderGallery(rawItems);
};

galleryButton.addEventListener("click", galleryButtonListener);


const listButtonListener = async () => {
    const rawItems = await getItems();
    if (!rawItems) {
        dashboardError.classList.replace("hidden", "flex");
        return;
    } else {
        dashboardError.classList.replace("flex", "hidden");
    }

    localStorage.setItem("view", "list")

    listButton.classList.add("active");
    galleryButton.classList.remove("active");

    
    dashboardGallery.classList.add("hidden");
    dashboardGallery.classList.remove("grid");
    dashboardGallery.innerHTML = ``

    dashboardList.classList.add("flex");
    dashboardList.classList.remove("hidden")

    renderList(rawItems);
};

listButton.addEventListener("click", listButtonListener);

const initialView = localStorage.getItem("view");
if (initialView === "gallery") {
    galleryButtonListener();
} else if (initialView === "list") {
    listButtonListener();
} else {
    galleryButtonListener();
}

