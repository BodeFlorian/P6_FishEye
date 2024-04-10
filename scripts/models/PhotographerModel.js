// Import de la classe PhotographerApi pour récupérer les données des photographes
import { PhotographerApi } from "../api/Api.js";
// Import de la factory MediaFactory pour créer les objets Media
import MediaFactory from "./../factories/MediaFactory.js";

// Définition de la classe PhotographerModel pour représenter un photographe
class PhotographerModel {
    constructor(data) {
        // Extraction des données du photographe
        const { id, name, portrait, city, country, tagline, price } = data;
        this._id = id;
        this._name = name;
        this._picture = `./assets/photographers/${portrait}`;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
    }

    // Getters pour accéder aux propriétés du photographe
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get picture() {
        return this._picture;
    }

    get city() {
        return this._city;
    }

    get country() {
        return this._country;
    }

    get tagline() {
        return this._tagline;
    }

    get price() {
        return this._price;
    }

    // Méthode pour récupérer les médias associés à ce photographe
    async getMedia() {
        try {
            // Récupération des données des médias depuis l'API
            const photographerApi = new PhotographerApi('./../../data/photographers.json');
            const photographers = await photographerApi.getPhotographers();
            // Filtrage des médias pour récupérer ceux associés à ce photographe
            const mediaData = photographers['media'].filter((media) => media.photographerId === this._id);
            // Création des objets Media à partir des données
            const mediaObjects = mediaData.map((mediaItem) => {
                return MediaFactory.createMedia(mediaItem, this);
            });
            return mediaObjects;
        } catch (error) {
            console.error("An error occurred while fetching media data:", error);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
}

// Export de la classe PhotographerModel
export default PhotographerModel;