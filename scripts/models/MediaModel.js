class MediaModel {
    constructor(data){
        const { id, photographer, title, likes, date, price } = data;
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

    get photographerId() {
        return this._photographerId;
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

class ImageModel extends MediaModel {
    constructor(data) {
        super(data);
        const { image } = data;
        this._image = image;
    }

    get image() {
        return this._image;
    }
}

class VideoModel extends MediaModel {
    constructor(data) {
        super(data);
        const { video } = data;
        this._video = video;
    }

    get video() {
        return this._video;
    }
}