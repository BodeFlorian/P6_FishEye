import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";
import { PhotographerApi } from "../api/Api.js";

const params = new URL(document.location).searchParams;
const id = params.get("id");

async function displayData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerTemplate = new PhotographerTemplate(photographer);
    const userBannerDOM = photographerTemplate.getUserBannerDOM();
    photographerSection.appendChild(userBannerDOM);
}

async function init() {
    const photographerApi = new PhotographerApi('./../../data/photographers.json');
    const photographers = await photographerApi.getPhotographers();
    const photographerData = photographers['photographers'].find(photographer => photographer.id === parseInt(id));

    if (photographerData) {
        const photographerModel = new PhotographerModel(photographerData);
        displayData(photographerModel);
    } else {
        window.location.href = './index.html';
    }
}

init();