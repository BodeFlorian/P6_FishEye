class PhotographerTemplate {
    constructor(photographer){
        this._photographer = photographer;
    }

    get photographer() {
        return this._photographer;
    }

    getUserCardDOM() {
        const a = document.createElement( 'a' );
        a.className = "card";
        a.href = `./photographer.html?id=${this._photographer.id}`;

        const img = document.createElement( 'img' );
        img.className = "card__img";
        img.src = `${this._photographer.picture}`;
        img.alt = `${this._photographer.name}`;

        const div = document.createElement('div');
        div.className = "card__content";

        const h2 = document.createElement( 'h2' );
        h2.className = "card__title";
        h2.textContent = `${this._photographer.name}`;

        const h3 = document.createElement( 'h3' );
        h3.className = "card__location";
        h3.textContent = `${this._photographer.city}, ${this._photographer.country}`;

        const p = document.createElement( 'p' );
        p.className = "card__tagline";
        p.textContent = `${this._photographer.tagline}`;

        const span = document.createElement( 'span' );
        span.className = "card__price";
        span.textContent = `${this._photographer.price}€/jour`;

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(span);
        a.appendChild(img);
        a.appendChild(div);

        return (a);
    }
}

export default PhotographerTemplate;