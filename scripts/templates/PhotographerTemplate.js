class PhotographerTemplate {
    constructor(photographer) {
        this._photographer = photographer;
    }

    get photographer() {
        return this._photographer;
    }

    getUserCardDOM(ariaLabel = '') {
        const article = this.#createArticle("card", ariaLabel);
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

    getUserBannerDOM() {
        const banner = this.#createDivElement("banner");
        const div = this.#createDivElement("card");
        const h1 = this.#createHeadingElement("h2", "card__title", this._photographer.name);
        const h2 = this.#createHeadingElement("h3", "card__location", `${this._photographer.city}, ${this._photographer.country}`);
        const p = this.#createParagraphElement("card__tagline", this._photographer.tagline);
        const button = this.#createButtonElement("contact_button", "Contactez-moi", "Contact button");
        const img = this.#createImage(this._photographer.picture, "photographer__img", this._photographer.name);

        div.appendChild(h1);
        div.appendChild(h2);
        div.appendChild(p);
        banner.appendChild(div);
        banner.appendChild(button);
        banner.appendChild(img);

        return banner;
    }

    #createArticle(className, ariaLabel) {
        const article = document.createElement('article');
        article.className = className;
        if (ariaLabel) {
            article.ariaLabel = ariaLabel;
        }
        return article;
    }

    #createLink(href, className) {
        const link = document.createElement('a');
        link.className = className;
        link.href = href;
        return link;
    }

    #createImage(src, className, alt) {
        const img = document.createElement('img');
        img.className = className;
        img.src = src;
        img.alt = alt;
        return img;
    }

    #createDivElement(className) {
        const div = document.createElement('div');
        div.className = className;
        return div;
    }

    #createHeadingElement(tagName, className, textContent) {
        const heading = document.createElement(tagName);
        heading.className = className;
        heading.textContent = textContent;
        return heading;
    }

    #createParagraphElement(className, textContent) {
        const paragraph = document.createElement('p');
        paragraph.className = className;
        paragraph.textContent = textContent;
        return paragraph;
    }

    #createSpanElement(className, textContent) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = textContent;
        return span;
    }

    #createButtonElement(className, textContent, ariaLabel) {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = textContent;
        button.ariaLabel = ariaLabel;
        button.onclick = displayModal
        return button;
    }
}

export default PhotographerTemplate;