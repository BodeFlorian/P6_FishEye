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
}

export default PhotographerModel;