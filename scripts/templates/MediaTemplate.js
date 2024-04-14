import Toolbox from './../utils/Toolbox.js';

class MediaTemplate {
    /**
     * Crée une instance de MediaTemplate.
     * @param {Object} media - Les données du média.
     */
    constructor(media) {
        this._media = media;
    }

    /**
     * Génère et retourne un élément DOM représentant une image.
     * @returns {HTMLElement} - L'élément DOM représentant l'image.
     */
    getImage() {
        return Toolbox.createMediaElementDOM('img', this._media);
    }

    /**
     * Génère et retourne un élément DOM représentant une vidéo.
     * @returns {HTMLElement} - L'élément DOM représentant la vidéo.
     */
    getVideo() {
        return Toolbox.createMediaElementDOM('video', this._media);
    }
}

export default MediaTemplate;