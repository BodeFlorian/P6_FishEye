import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";
import MediaTemplate from "../templates/MediaTemplate.js";
import { PhotographerApi } from "../api/Api.js";

// Extraction de l'ID du photographe de l'URL
const params = new URL(document.location).searchParams;
const id = params.get("id");

/**
 * Affiche les médias du photographe en générant et en ajoutant les éléments au DOM.
 * @param {Array} medias - Les données des médias à afficher.
 * @returns {void}
 */
const displayMedia = async (medias) => {
    const mediaSection = document.querySelector(".media");
    const skeleton = document.querySelectorAll(".skeleton-card");

    const promises = [];
    const mediaItems = [];

    // Parcours des médias pour les afficher
    medias.forEach((media) => {
        switch (media.type) {
            case "image":
                const mediaTemplate = new MediaTemplate(media);
                const mediaItem = mediaTemplate.getImage();

                const imageElement = mediaItem.querySelector('img');
                const promise = new Promise((resolve, reject) => {
                    imageElement.onload = resolve;
                    imageElement.onerror = reject;
                });

                promises.push(promise);
                mediaItems.push(mediaItem);
                break;
            case "video":
                const videoTemplate = new MediaTemplate(media);
                const videoItem = videoTemplate.getVideo();

                const videoElement = videoItem.querySelector('video');
                const videoPromise = new Promise((resolve, reject) => {
                    videoElement.onloadeddata = resolve;
                    videoElement.onerror = reject;
                });

                promises.push(videoPromise);
                mediaItems.push(videoItem);
                break;
        }
    });

    // Attente que toutes les promesses se réalisent
    try {
        await Promise.all(promises);
        skeleton.forEach((skeletonCard) => {
            skeletonCard.remove();
        });
        mediaItems.forEach((mediaItem) => {
            mediaSection.appendChild(mediaItem);
        });
    } catch (error) {
        console.error("An error occurred while loading images.");
    }
};

/**
 * Affiche les informations du photographe en générant et en ajoutant les éléments au DOM.
 * @param {Object} photographer - Les données du photographe à afficher.
 * @returns {void}
 */
const displayPhotographer = async (photographer) => {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerTemplate = new PhotographerTemplate(photographer);
    const userBannerDOM = photographerTemplate.getUserBannerDOM();
    const skeletonBanner = document.querySelector(".skeleton-banner");

    // Vérifier si les éléments nécessaires sont présents dans userBannerDOM
    const elementsPresent = userBannerDOM.querySelector(".card__title") &&
                            userBannerDOM.querySelector(".card__location") &&
                            userBannerDOM.querySelector(".card__tagline") &&
                            userBannerDOM.querySelector(".contact_button") &&
                            userBannerDOM.querySelector(".photographer__img");

    try {
        // Attendre que les éléments nécessaires soient présents dans userBannerDOM
        if (elementsPresent) {
            skeletonBanner.remove();
            photographerSection.appendChild(userBannerDOM);
        } else {
            console.warn("Some elements are missing in userBannerDOM. Check getUserBannerDOM implementation.");
        }
    } catch (error) {
        console.error("An error occurred while loading photographer data:", error);
    }
};

/**
 * Initialise l'application en récupérant les données du photographe depuis l'API
 * et en affichant ces données.
 * @returns {void}
 */
async function init() {
    try {
        const photographers = await PhotographerApi.getPhotographers('./../../data/photographers.json');
        const photographerData = photographers['photographers'].find((photographer) => photographer.id === parseInt(id));

        if (photographerData) {
            // Création du modèle de photographe et récupération de ses médias
            const photographerModel = new PhotographerModel(photographerData);
            const mediaData = await photographerModel.getMedia();
            // Affichage des informations du photographe et de ses médias
            displayPhotographer(photographerModel);
            displayMedia(mediaData);
        } else {
            // Redirection vers la page d'accueil si le photographe n'existe pas
            window.location.href = './index.html';
        }
    } catch (error) {
        console.error("An error occurred during initialization:", error);
    }
}

init();