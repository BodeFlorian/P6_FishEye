import Toolbox from './../utils/Toolbox.js';

class PhotographerTemplate {
  /**
   * Crée une instance de PhotographerTemplate.
   * @param {Object} photographer - Les informations du photographe.
   */
  constructor(photographer) {
    this._photographer = photographer;
  }

  /**
   * Génère et retourne la carte utilisateur (utilisée dans la liste des photographes).
   * @returns {HTMLElement} - La carte utilisateur DOM.
   */
  getUserCardDOM() {
    const article = Toolbox.createArticle(
      'card',
      `Redirection to ${this._photographer.name}'s page`,
    );
    const a = Toolbox.createLink(
      `./photographer.html?id=${this._photographer.id}`,
      'card__link',
    );
    const img = Toolbox.createImage(
      this._photographer.picture,
      'card__img',
      '',
    );
    const div = Toolbox.createDivElement('card__content');
    const h2 = Toolbox.createHeadingElement(
      'h2',
      'card__title',
      this._photographer.name,
    );
    const h3 = Toolbox.createHeadingElement(
      'h3',
      'card__location',
      `${this._photographer.city}, ${this._photographer.country}`,
    );
    const p = Toolbox.createParagraphElement(
      'card__tagline',
      this._photographer.tagline,
    );
    const span = Toolbox.createSpanElement(
      'card__price',
      `${this._photographer.price}€/jour`,
    );

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(span);
    a.appendChild(img);
    a.appendChild(div);
    article.appendChild(a);

    return article;
  }

  /**
   * Génère et retourne la bannière utilisateur (utilisée sur la page du photographe).
   * @returns {HTMLElement} - La bannière utilisateur DOM.
   */
  getUserBannerDOM() {
    const banner = Toolbox.createDivElement('banner');
    const div = Toolbox.createDivElement('card');
    const h1 = Toolbox.createHeadingElement(
      'h1',
      'card__title',
      this._photographer.name,
    );
    const loc = Toolbox.createParagraphElement(
      'card__location',
      `${this._photographer.city}, ${this._photographer.country}`,
    );
    const p = Toolbox.createParagraphElement(
      'card__tagline',
      this._photographer.tagline,
    );
    const button = Toolbox.createButtonElement(
      'contact_button',
      'Contactez-moi',
      'Contact button',
    );
    const img = Toolbox.createImage(
      this._photographer.picture,
      'photographer__img',
      this._photographer.name,
    );

    div.appendChild(h1);
    div.appendChild(loc);
    div.appendChild(p);
    banner.appendChild(div);
    banner.appendChild(button);
    banner.appendChild(img);

    return banner;
  }

  /**
   * Génère et retourne la bannière data de l'utilisateur (utilisée sur la page du photographe).
   * @returns {HTMLElement} - La bannière data de l'utilisateur DOM.
   */
  getUserDataDOM() {
    const data = Toolbox.createDivElement('data-container');
    const like = Toolbox.createParagraphElement(
      'data-container__likes',
      this._photographer.like,
    );
    const price = Toolbox.createParagraphElement(
      'data-container__price',
      `${this._photographer.price}€/jour`,
    );

    data.appendChild(like);
    data.appendChild(price);

    return data;
  }
}

export default PhotographerTemplate;
