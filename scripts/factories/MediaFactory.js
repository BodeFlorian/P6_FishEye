// Import des classes ImageModel et VideoModel pour créer les objets de médias
import { ImageModel, VideoModel } from "./../models/MediaModel.js";

// Définition de la classe MediaFactory pour créer les objets de médias
class MediaFactory {
    // Méthode statique pour créer un objet de média en fonction des données fournies
    static createMedia(data, photographer) {
        // Vérification du type de média à partir des données
        if (data.hasOwnProperty('image')) {
            // Si les données contiennent une propriété 'image', crée un objet ImageModel
            return new ImageModel(data, photographer);
        } else if (data.hasOwnProperty('video')) {
            // Si les données contiennent une propriété 'video', crée un objet VideoModel
            return new VideoModel(data, photographer);
        } else {
            // Si le type de média n'est pas reconnu, lance une exception
            throw new Error('Unable to determine media type');
        }
    }
}

// Export de la classe MediaFactory
export default MediaFactory;