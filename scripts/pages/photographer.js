import PhotographerModel from '../models/PhotographerModel.js';
import PhotographerTemplate from '../templates/PhotographerTemplate.js';
import MediaTemplate from '../templates/MediaTemplate.js';
import { PhotographerApi } from '../api/Api.js';
import Lightbox from '../utils/Lightbox.js';

const params = new URL(document.location).searchParams;
const id = params.get('id');
const sortSelect = document.getElementById('sort');

let mediaData;

/**
 * Trie les médias en fonction du critère de tri spécifié.
 * @param {string} sortBy - Le critère de tri (popularity, date, title).
 * @param {Array} mediaData - Les données des médias à trier.
 * @returns {void}
 */
const sortMediaBy = (sortBy, mediaData) => {
  let sortedMedia;
  switch (sortBy) {
    case 'popularity':
      sortedMedia = mediaData.slice().sort((a, b) => b.likes - a.likes);
      break;
    case 'date':
      sortedMedia = mediaData
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'title':
      sortedMedia = mediaData
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      sortedMedia = mediaData;
      break;
  }

  displayMedia(sortedMedia);
};

/**
 * Affiche les médias du photographe en générant et en ajoutant les éléments au DOM.
 * @param {Array} medias - Les données des médias à afficher.
 * @returns {void}
 */
const displayMedia = async (medias) => {
  const mediaSection = document.querySelector('.media');
  const existingMedia = document.querySelectorAll('.media-card');
  const skeleton = document.querySelectorAll('.skeleton-card');

  if (existingMedia.length > 0) {
    skeleton.forEach((skeletonCard) => {
      skeletonCard.style.display = 'block';
    });
  }
  existingMedia.forEach((media) => media.remove());

  const promises = [];
  const mediaItems = []; //HTML Media

  medias.forEach((media) => {
    switch (media.type) {
      case 'image':
        const mediaTemplate = new MediaTemplate(media);
        const mediaItem = mediaTemplate.getImage();

        const imageElement = mediaItem.querySelector('img');
        const promise = new Promise((resolve, reject) => {
          imageElement.onload = resolve;
          imageElement.onerror = reject;
        });

        promises.push(promise);
        mediaItems.push(mediaItem);
        break;
      case 'video':
        const videoTemplate = new MediaTemplate(media);
        const videoItem = videoTemplate.getVideo();

        const videoElement = videoItem.querySelector('video');
        const videoPromise = new Promise((resolve, reject) => {
          videoElement.onloadeddata = resolve;
          videoElement.onerror = reject;
        });

        promises.push(videoPromise);
        mediaItems.push(videoItem);
        break;
    }
  });

  try {
    await Promise.all(promises);
    skeleton.forEach((skeletonCard) => {
      skeletonCard.style.display = 'none';
    });
    mediaItems.forEach((mediaItem) => {
      mediaItem.addEventListener('click', (e) => {
        e.preventDefault();
        const mediaElement = e.currentTarget.querySelector('img, video');
        if (mediaElement.tagName === 'IMG') {
          new Lightbox(mediaElement, mediaItems);
        } else if (mediaElement.tagName === 'VIDEO') {
          new Lightbox(mediaElement, mediaItems);
        }
      });
      mediaSection.appendChild(mediaItem);
    });
  } catch (error) {
    console.error('An error occurred while loading media.');
  }
};

/**
 * Affiche les informations du photographe en générant et en ajoutant les éléments au DOM.
 * @param {Object} photographer - Les données du photographe à afficher.
 * @returns {void}
 */
const displayPhotographer = async (photographer) => {
  const photographerSection = document.querySelector('.photograph-header');
  const photographerTemplate = new PhotographerTemplate(photographer);
  const userBannerDOM = photographerTemplate.getUserBannerDOM();
  const userDataDom = photographerTemplate.getUserDataDOM();
  const skeletonBanner = document.querySelector('.skeleton-banner');

  const elementsPresent =
    userBannerDOM.querySelector('.card__title') &&
    userBannerDOM.querySelector('.card__location') &&
    userBannerDOM.querySelector('.card__tagline') &&
    userBannerDOM.querySelector('.contact_button') &&
    userBannerDOM.querySelector('.photographer__img');

  try {
    if (elementsPresent) {
      skeletonBanner.remove();
      photographerSection.appendChild(userBannerDOM);
      document.querySelector('body').appendChild(userDataDom);
    }
  } catch (error) {
    console.error('An error occurred while loading photographer data:', error);
  }
};

/**
 * Initialise l'application en récupérant les données du photographe depuis l'API
 * et en affichant ces données.
 * @returns {void}
 */
async function init() {
  try {
    const photographers = await PhotographerApi.getPhotographers(
      './../../data/photographers.json',
    );
    const photographerData = photographers['photographers'].find(
      (photographer) => photographer.id === parseInt(id),
    );

    if (photographerData) {
      const photographerModel = new PhotographerModel(photographerData);
      mediaData = await photographerModel.getMedia();

      displayPhotographer(photographerModel);
      sortMediaBy('popularity', mediaData);
    } else {
      // Redirection vers la page d'accueil si le photographe n'existe pas
      window.location.href = './index.html';
    }
  } catch (error) {
    console.error('An error occurred during initialization:', error);
  }
}

init();

sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  sortMediaBy(sortBy, mediaData);
});
