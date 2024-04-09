import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";
import { PhotographerApi } from "../api/Api.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerModel(photographer);
        const photographerTemplate = new PhotographerTemplate(photographerModel);
        const userCardDOM = photographerTemplate.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const photographerApi = new PhotographerApi('./../../data/photographers.json');
    const photographers = await photographerApi.getPhotographers();

    if (photographers) {
        displayData(photographers['photographers']);
    }
}

init();