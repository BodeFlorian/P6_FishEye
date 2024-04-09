class MediaModel {
    constructor(data, photographer){
        const { id, title, likes, date, price } = data;
        this._id = id;
        this._photographer = photographer;
        this._title = title;
        this._likes = likes;
        this._date = date;
        this._price = price;
    }

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

export class ImageModel extends MediaModel {
    constructor(data, photographer) {
        super(data, photographer);
        const { image } = data;
        const [firstName, ...lastName] = this._photographer.name.split(' ');
        this._type = "image";
        this._url = `./assets/images/${firstName}/${image}`;
    }

    get type() {
        return this._type;
    }

    get url() {
        return this._url;
    }
}

export class VideoModel extends MediaModel {
    constructor(data, photographer) {
        super(data, photographer);
        const { video } = data;
        const [firstName, ...lastName] = this._photographer.name.split(' ');
        this._type = "video";
        this._url = `./assets/images/${firstName}/${video}`;
    }

    get type() {
        return this._type;
    }

    get url() {
        return this._url;
    }
}

export default { ImageModel, VideoModel };