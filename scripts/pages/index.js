// Import des modules nécessaires
import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";
import { PhotographerApi } from "../api/Api.js";

// Fonction pour afficher les données des photographes
const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    // Création et affichage des cartes de photographe
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerModel(photographer);
        const photographerTemplate = new PhotographerTemplate(photographerModel);
        const userCardDOM = photographerTemplate.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Fonction d'initialisation
async function init() {
    try {
        // Récupération des données des photographes depuis l'API
        const photographerApi = new PhotographerApi('./../../data/photographers.json');
        const photographers = await photographerApi.getPhotographers();

        // Affichage des données des photographes si disponibles
        if (photographers) {
            displayData(photographers['photographers']);
        }
    } catch (error) {
        // Gestion des erreurs
        console.error("An error occurred during initialization:", error);
    }
}

// Appel de la fonction d'initialisation au chargement de la page
init();