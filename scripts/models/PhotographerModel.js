import { PhotographerApi } from '../api/Api.js';
import MediaFactory from './../factories/MediaFactory.js';

class PhotographerModel {
  /**
   * Crée une instance de PhotographerModel à partir des données fournies.
   * @param {Object} data - Les données du photographe.
   */
  constructor(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    this._id = id;
    this._name = name;
    this._picture = `./assets/photographers/${portrait}`;
    this._city = city;
    this._country = country;
    this._tagline = tagline;
    this._price = price;
    this._like = 0;
  }

  /**
   * Obtient l'identifiant du photographe.
   * @returns {number} L'identifiant du photographe.
   */
  get id() {
    return this._id;
  }

  /**
   * Obtient le nom du photographe.
   * @returns {string} Le nom du photographe.
   */
  get name() {
    return this._name;
  }

  /**
   * Obtient le chemin d'accès à l'image du photographe.
   * @returns {string} Le chemin d'accès à l'image du photographe.
   */
  get picture() {
    return this._picture;
  }

  /**
   * Obtient la ville du photographe.
   * @returns {string} La ville du photographe.
   */
  get city() {
    return this._city;
  }

  /**
   * Obtient le pays du photographe.
   * @returns {string} Le pays du photographe.
   */
  get country() {
    return this._country;
  }

  /**
   * Obtient le slogan du photographe.
   * @returns {string} Le slogan du photographe.
   */
  get tagline() {
    return this._tagline;
  }

  /**
   * Obtient le prix horaire du photographe.
   * @returns {number} Le prix horaire du photographe.
   */
  get price() {
    return this._price;
  }

  /**
   * Obtient le nombre de like du photographe.
   * @returns {number} Le nombre de like du photographe.
   */
  get like() {
    return this._like;
  }

  addLike() {
    this._like += 1;
  }

  /**
   * Récupère les médias associés à ce photographe.
   * @returns {Array} Un tableau contenant les médias associés au photographe.
   */
  async getMedia() {
    try {
      const photographers = await PhotographerApi.getPhotographers(
        './../../data/photographers.json',
      );
      const mediaData = photographers['media'].filter(
        (media) => media.photographerId === this._id,
      );
      const mediaObjects = mediaData.map((mediaItem) => {
        this._like += mediaItem.likes;
        return MediaFactory.createMedia(mediaItem, this);
      });
      return mediaObjects;
    } catch (error) {
      console.error('An error occurred while fetching media data:', error);
      return [];
    }
  }
}

export default PhotographerModel;
