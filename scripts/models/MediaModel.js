// Définition de la classe de base pour tous les types de médias
class MediaModel {
    constructor(data, photographer) {
        // Extraction des données communes à tous les types de médias
        const { id, title, likes, date, price } = data;
        this._id = id;
        this._photographer = photographer;
        this._title = title;
        this._likes = likes;
        this._date = date;
        this._price = price;
    }

    // Getters pour accéder aux propriétés communes à tous les types de médias
    get id() {
        return this._id;
    }

    get photographer() {
        return this._photographer;
    }

    get title() {
        return this._title;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }
}

// Classe pour représenter un média de type image
class ImageModel extends MediaModel {
    constructor(data, photographer) {
        super(data, photographer);
        const { image } = data;
        // Génération de l'URL de l'image en fonction du photographe et du nom du fichier
        const [firstName] = this._photographer.name.split(' ');
        this._type = "image";
        this._url = `./assets/images/${firstName}/${image}`;
    }

    // Getter spécifique pour le type de média (image)
    get type() {
        return this._type;
    }

    // Getter pour l'URL de l'image
    get url() {
        return this._url;
    }
}

// Classe pour représenter un média de type vidéo
class VideoModel extends MediaModel {
    constructor(data, photographer) {
        super(data, photographer);
        const { video } = data;
        // Génération de l'URL de la vidéo en fonction du photographe et du nom du fichier
        const [firstName] = this._photographer.name.split(' ');
        this._type = "video";
        this._url = `./assets/images/${firstName}/${video}`;
    }

    // Getter spécifique pour le type de média (vidéo)
    get type() {
        return this._type;
    }

    // Getter pour l'URL de la vidéo
    get url() {
        return this._url;
    }
}

// Export des classes ImageModel et VideoModel
export { ImageModel, VideoModel };