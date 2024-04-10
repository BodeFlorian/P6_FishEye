class MediaTemplate {
    constructor(media) {
        this._media = media;
    }

    // Méthode pour générer un élément DOM représentant une image
    getImage() {
        return this.#createMediaElementDOM('img');
    }

    // Méthode pour générer un élément DOM représentant une vidéo
    getVideo() {
        return this.#createMediaElementDOM('video');
    }

    // Méthode privée pour créer un élément DOM avec une balise spécifiée
    #createMediaElementDOM(tagName) {
        const article = this.#createArticle("media-card", "Open the lightbox");

        const mediaElement = document.createElement(tagName);
        mediaElement.src = this._media.url;
        if (tagName === 'img') {
            mediaElement.alt = this._media.title;
        }
        mediaElement.className = "media-card__img";

        const div = this.#createDivElement("media-card__content");
        const h4 = this.#createHeadingElement("h4", "media-card__title", this._media.title);
        const p = this.#createParagraphElement("media-card__like", this._media.likes);

        div.appendChild(h4);
        div.appendChild(p);
        article.appendChild(mediaElement);
        article.appendChild(div);

        return article;
    }

    // Méthode privée pour créer un élément article
    #createArticle(className, ariaLabel) {
        const article = document.createElement('article');
        article.className = className;
        article.ariaLabel = ariaLabel;
        //article.onclick = openLightbox;

        return article;
    }

    // Méthode privée pour créer un élément div
    #createDivElement(className) {
        const div = document.createElement('div');
        div.className = className;
        return div;
    }

    // Méthode privée pour créer un élément de titre
    #createHeadingElement(tagName, className, textContent) {
        const heading = document.createElement(tagName);
        heading.className = className;
        heading.textContent = textContent;
        return heading;
    }

    // Méthode privée pour créer un élément de paragraphe
    #createParagraphElement(className, textContent) {
        const paragraph = document.createElement('p');
        paragraph.className = className;
        paragraph.textContent = textContent;
        return paragraph;
    }

    // Méthode privée pour créer un élément span
    #createSpanElement(className, textContent) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = textContent;
        return span;
    }
}

export default MediaTemplate;