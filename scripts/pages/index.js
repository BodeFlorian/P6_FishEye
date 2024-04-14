import PhotographerModel from "../models/PhotographerModel";
import PhotographerTemplate from "../templates/PhotographerTemplate";
import { PhotographerApi } from "../api/Api";

/**
 * Affiche les données des photographes en générant et en ajoutant les cartes des photographes au DOM.
 * @param {Array} photographersData - Les données des photographes à afficher.
 * @returns {void}
 */
const displayData = async (photographersData) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographersData.forEach((photographerData) => {
        const photographerModel = new PhotographerModel(photographerData);
        const photographerTemplate = new PhotographerTemplate(photographerModel);
        const userCardDOM = photographerTemplate.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

/**
 * Initialise l'application en récupérant les données des photographes depuis l'API
 * et en affichant ces données.
 * @returns {void}
 */
async function init() {
    try {
        const photographers = await PhotographerApi.getPhotographers('./../../data/photographers.json');

        if (photographers) {
            displayData(photographers['photographers']);
        }
    } catch (error) {
        console.error("An error occurred during initialization:", error);
    }
}

init();