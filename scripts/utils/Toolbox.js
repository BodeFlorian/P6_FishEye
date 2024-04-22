class Toolbox {
  /**
   * Crée et retourne un élément article avec les classes spécifiées et l'attribut aria-label.
   * @param {string} className - Les classes à ajouter à l'élément article.
   * @param {string} ariaLabel - La valeur de l'attribut aria-label.
   * @returns {HTMLArticleElement} - L'élément article créé.
   */
  static createArticle(className, ariaLabel = '') {
    const article = document.createElement('article');
    article.className = className;
    if (ariaLabel.length > 0) {
      article.ariaLabel = ariaLabel;
    }
    return article;
  }

  /**
   * Crée et retourne un lien avec l'URL spécifiée et les classes spécifiées.
   * @param {string} href - L'URL du lien.
   * @param {string} className - Les classes à ajouter au lien.
   * @returns {HTMLAnchorElement} - Le lien créé.
   */
  static createLink(href, className) {
    const link = document.createElement('a');
    link.className = className;
    link.href = href;
    return link;
  }

  /**
   * Crée et retourne une image avec la source, les classes et l'attribut alt spécifiés.
   * @param {string} src - La source de l'image.
   * @param {string} className - Les classes à ajouter à l'image.
   * @param {string} alt - La valeur de l'attribut alt de l'image.
   * @returns {HTMLImageElement} - L'image créée.
   */
  static createImage(src, className, alt) {
    const img = document.createElement('img');
    img.className = className;
    img.src = src;
    img.alt = alt;
    return img;
  }

  /**
   * Crée et retourne un élément div avec les classes spécifiées.
   * @param {string} className - Les classes à ajouter à l'élément div.
   * @returns {HTMLDivElement} - L'élément div créé.
   */
  static createDivElement(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }

  /**
   * Crée et retourne un élément de titre avec la balise, les classes et le texte spécifiés.
   * @param {string} tagName - La balise du titre (ex: 'h1', 'h2', etc.).
   * @param {string} className - Les classes à ajouter au titre.
   * @param {string} textContent - Le texte à afficher dans le titre.
   * @returns {HTMLElement} - L'élément de titre créé.
   */
  static createHeadingElement(tagName, className, textContent) {
    const heading = document.createElement(tagName);
    heading.className = className;
    heading.textContent = textContent;
    return heading;
  }

  /**
   * Crée et retourne un élément de paragraphe avec les classes et le texte spécifiés.
   * @param {string} className - Les classes à ajouter au paragraphe.
   * @param {string} textContent - Le texte à afficher dans le paragraphe.
   * @returns {HTMLParagraphElement} - L'élément de paragraphe créé.
   */
  static createParagraphElement(className, textContent) {
    const paragraph = document.createElement('p');
    paragraph.className = className;
    paragraph.textContent = textContent;
    return paragraph;
  }

  /**
   * Crée et retourne un élément span avec les classes et le texte spécifiés.
   * @param {string} className - Les classes à ajouter au span.
   * @param {string} textContent - Le texte à afficher dans le span.
   * @returns {HTMLSpanElement} - L'élément span créé.
   */
  static createSpanElement(className, textContent) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = textContent;
    return span;
  }

  /**
   * Crée et retourne un bouton avec les classes, le texte et l'attribut aria-label spécifiés.
   * Associe également la fonction displayModal à l'événement onclick du bouton.
   * @param {string} className - Les classes à ajouter au bouton.
   * @param {string} textContent - Le texte à afficher sur le bouton.
   * @param {string} ariaLabel - La valeur de l'attribut aria-label du bouton.
   * @returns {HTMLButtonElement} - Le bouton créé.
   */
  static createButtonElement(className, textContent, ariaLabel) {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = textContent;
    button.setAttribute('aria-label', ariaLabel);
    button.onclick = displayModal;
    return button;
  }

  /**
   * Crée et retourne un élément DOM avec une balise spécifiée pour représenter un média.
   * @param {string} tagName - La balise de l'élément DOM (ex: 'img', 'video', etc.).
   * @param {Object} media - Objet media.
   * @returns {HTMLElement} - L'élément DOM créé.
   */
  static createMediaElementDOM(tagName, media) {
    const article = Toolbox.createArticle('media-card');

    const mediaElement = document.createElement(tagName);
    mediaElement.src = media.url;
    if (tagName === 'img') {
      mediaElement.alt = media.title;
    }
    mediaElement.className = 'media-card__img';
    mediaElement.ariaLabel = 'Open the Lightbox';
    mediaElement.tabIndex = 0;

    const div = Toolbox.createDivElement('media-card__content');
    const title = Toolbox.createParagraphElement(
      'media-card__title',
      media.title,
    );

    const p = Toolbox.createParagraphElement('media-card__like', media.likes);
    p.tabIndex = 0;

    div.appendChild(title);
    div.appendChild(p);
    article.appendChild(mediaElement);
    article.appendChild(div);

    p.addEventListener('click', function (event) {
      event.preventDefault();
      if (!media.isLike) {
        media.addLike();
        p.textContent = media.likes;
        document.querySelector('.data-container__likes').textContent =
          media.photographer.like;
      }
    });

    p.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        p.click();
      }
    });

    mediaElement.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        p.click();
      }
    });

    return article;
  }
}

export default Toolbox;
