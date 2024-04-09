import { ImageModel, VideoModel } from "./../models/MediaModel.js";

class MediaFactory {
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