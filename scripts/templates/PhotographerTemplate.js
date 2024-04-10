class PhotographerTemplate {
    constructor(photographer) {
        this._photographer = photographer;
    }

    // Méthode pour obtenir les informations du photographe
    get photographer() {
        return this._photographer;
    }

    // Méthode pour générer la carte utilisateur (utilisée dans la liste des photographes)
    getUserCardDOM() {
        const article = this.#createArticle("card", "Redirection to the protographer's page");
        const a = this.#createLink(`./photographer.html?id=${this._photographer.id}`, "card__link");
        const img = this.#createImage(this._photographer.picture, "card__img", this._photographer.name);
        const div = this.#createDivElement("card__content");
        const h2 = this.#createHeadingElement("h2", "card__title", this._photographer.name);
        const h3 = this.#createHeadingElement("h3", "card__location", `${this._photographer.city}, ${this._photographer.country}`);
        const p = this.#createParagraphElement("card__tagline", this._photographer.tagline);
        const span = this.#createSpanElement("card__price", `${this._photographer.price}€/jour`);

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(span);
        a.appendChild(img);
        a.appendChild(div);
        article.appendChild(a);

        return article;
    }

    // Méthode pour générer la bannière utilisateur (utilisée sur la page du photographe)
    getUserBannerDOM() {
        const banner = this.#createDivElement("banner");
        const div = this.#createDivElement("card");
        const h2 = this.#createHeadingElement("h2", "card__title", this._photographer.name);
        const h3 = this.#createHeadingElement("h3", "card__location", `${this._photographer.city}, ${this._photographer.country}`);
        const p = this.#createParagraphElement("card__tagline", this._photographer.tagline);
        const button = this.#createButtonElement("contact_button", "Contactez-moi", "Contact button");
        const img = this.#createImage(this._photographer.picture, "photographer__img", this._photographer.name);

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(p);
        banner.appendChild(div);
        banner.appendChild(button);
        banner.appendChild(img);

        return banner;
    }

    // Méthode privée pour créer un élément article
    #createArticle(className, ariaLabel) {
        const article = document.createElement('article');
        article.className = className;
        article.ariaLabel = ariaLabel;
        return article;
    }

    // Méthode privée pour créer un lien
    #createLink(href, className) {
        const link = document.createElement('a');
        link.className = className;
        link.href = href;
        return link;
    }

    // Méthode privée pour créer une image
    #createImage(src, className, alt) {
        const img = document.createElement('img');
        img.className = className;
        img.src = src;
        img.alt = alt;
        return img;
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

    // Méthode privée pour créer un bouton
    #createButtonElement(className, textContent, ariaLabel) {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = textContent;
        button.setAttribute('aria-label', ariaLabel);
        button.onclick = displayModal;
        return button;
    }
}

export default PhotographerTemplate;