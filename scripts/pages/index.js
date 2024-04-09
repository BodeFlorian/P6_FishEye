import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";

async function getPhotographers() {
    try {
        const response = await fetch('./../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data['photographers'];
    } catch (error) {
        console.error('Error fetching photographers data:', error);
    }
}

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
    const photographers = await getPhotographers();

    if (photographers) {
        displayData(photographers);
    }
}

init();