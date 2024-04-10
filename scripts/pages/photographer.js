// Import des modules nécessaires
import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";
import MediaTemplate from "../templates/MediaTemplate.js";
import { PhotographerApi } from "../api/Api.js";

// Extraction de l'ID du photographe de l'URL
const params = new URL(document.location).searchParams;
const id = params.get("id");

// Fonction pour afficher les médias du photographe
const displayMedia = async (medias) => {
    const mediaSection = document.querySelector(".media");
    const skeleton = document.querySelectorAll(".skeleton-card");

    const promises = [];
    const mediaItems = [];

    // Parcours des médias pour les afficher
    medias.forEach((media) => {
        switch (media.type) {
            case "image":
                // Création du template pour les images
                const mediaTemplate = new MediaTemplate(media);
                const mediaItem = mediaTemplate.getImage();

                // Gestion des promesses pour le chargement des images
                const imageElement = mediaItem.querySelector('img');
                const promise = new Promise((resolve, reject) => {
                    imageElement.onload = resolve;
                    imageElement.onerror = reject;
                });

                promises.push(promise);
                mediaItems.push(mediaItem);
                break;
            case "video":
                // À implémenter : gestion des vidéos
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

// Fonction pour afficher les informations du photographe
const displayPhotographer = (photographer) => {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerTemplate = new PhotographerTemplate(photographer);
    const userBannerDOM = photographerTemplate.getUserBannerDOM();
    photographerSection.appendChild(userBannerDOM);
};

// Fonction d'initialisation
async function init() {
    try {
        // Récupération des données du photographe depuis l'API
        const photographerApi = new PhotographerApi('./../../data/photographers.json');
        const photographers = await photographerApi.getPhotographers();
        const photographerData = photographers['photographers'].find((photographer) => photographer.id === parseInt(id));

        // Vérification si le photographe existe
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
};

// Appel de la fonction d'initialisation au chargement de la page
init();