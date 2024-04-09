class MediaFactory{
    constructor(data){
        if (data.hasOwnProperty('image')) {
            return new ImageModel(data);
        } else if (data.hasOwnProperty('video')) {
            return new VideoModel(data);
        } else {
            throw new Error('Unable to determine media type');
        }
    }
}