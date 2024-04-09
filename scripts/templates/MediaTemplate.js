class MediaTemplate{
    constructor(media){
        this._media = media;
    }

    getImage(){
        const div = document.createElement('div');
        div.className = "media-card";

        const img = document.createElement('img');
        img.src = this._media.url;
        img.alt = this._media.title;

        div.appendChild(img);

        return div
    }

    getVideo(){
        const div = document.createElement('div');
        div.className = "media-card";

        const video = document.createElement('video');
        video.src = this._media.url;

        div.appendChild(video);

        return div
    }
}

export default MediaTemplate;