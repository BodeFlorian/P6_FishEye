import { ImageModel, VideoModel } from "./../models/MediaModel";

class MediaFactory {
    /**
     * Crée un objet média en fonction des données fournies.
     * @param {Object} data - Les données du média à partir desquelles créer l'objet.
     * @param {Object} photographer - Le photographe associé au média.
     * @returns {ImageModel|VideoModel} L'objet de média créé.
     * @throws {Error} Si le type de média n'est pas reconnu.
     */
    static createMedia(data, photographer) {
        if (data.hasOwnProperty('image')) {
            return new ImageModel(data, photographer);
        } else if (data.hasOwnProperty('video')) {
            return new VideoModel(data, photographer);
        } else {
            throw new Error('Unable to determine media type');
        }
    }
}

export default MediaFactory;