import { PhotographerApi } from "../api/Api.js";
import PhotographerModel from "../models/PhotographerModel.js";

const params = new URL(document.location).searchParams;
const id = params.get("id");

async function init() {
    const photographerApi = new PhotographerApi('./../../data/photographers.json');
    const photographers = await photographerApi.getPhotographers();
    const photographerData = photographers['photographers'].find(photographer => photographer.id === parseInt(id));

    if (photographerData) {
        const photographer = new PhotographerModel(photographerData);
    } else {
        window.location.href = './index.html';
    }
}

init();