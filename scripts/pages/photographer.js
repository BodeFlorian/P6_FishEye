import PhotographerModel from "../models/PhotographerModel.js";
import PhotographerTemplate from "../templates/PhotographerTemplate.js";
import MediaTemplate from "../templates/MediaTemplate.js";
import { PhotographerApi } from "../api/Api.js";

const params = new URL(document.location).searchParams;
const id = params.get("id");

function displayMedia(medias){
    const mediaSection = document.querySelector(".media");

    console.log

    medias.forEach((media) => {
        switch(media.type){
            case "image":
                //console.log("Image" , media)
                const mediaTemplate = new MediaTemplate(media);
                const mediaItem = mediaTemplate.getImage();
                mediaSection.appendChild(mediaItem);
                break;
            case "video":
                //console.log("Video" , media)
                break;
        }
    })
}

function displayPhotographer(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerTemplate = new PhotographerTemplate(photographer);
    const userBannerDOM = photographerTemplate.getUserBannerDOM();
    photographerSection.appendChild(userBannerDOM);
}

async function init() {
    const photographerApi = new PhotographerApi('./../../data/photographers.json');
    const photographers = await photographerApi.getPhotographers();
    const photographerData = photographers['photographers'].find((photographer) => photographer.id === parseInt(id));

    if (photographerData) {
        const photographerModel = new PhotographerModel(photographerData);
        const mediaData = await photographerModel.getMedia();
        displayPhotographer(photographerModel);
        displayMedia(mediaData);
    } else {
        window.location.href = './index.html';
    }
}

init();