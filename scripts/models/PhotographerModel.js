import { PhotographerApi } from "../api/Api.js";
import MediaFactory  from "./../factories/MediaFactory.js";

class PhotographerModel {
    constructor(data){
        const { id, name, portrait, city, country, tagline, price } = data;
        this._id = id;
        this._name = name;
        this._picture = `./assets/photographers/${portrait}`;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
    }

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

    async getMedia() {
        const photographerApi = new PhotographerApi('./../../data/photographers.json');
        const photographers = await photographerApi.getPhotographers();
        const mediaData = photographers['media'].filter((media) => media.photographerId === this._id);

        const mediaObjects = mediaData.map((mediaItem) => {
            return MediaFactory.createMedia(mediaItem, this);
        });

        return mediaObjects;
    }

}

export default PhotographerModel;