function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        a.className = "card";
        a.href = `./photographer.html?id=${id}`;

        const img = document.createElement( 'img' );
        img.className = "card__img";
        img.src = picture;
        img.alt = name;

        const div = document.createElement('div');
        div.className = "card__content";

        const h2 = document.createElement( 'h2' );
        h2.className = "card__title";
        h2.textContent = name;

        const h3 = document.createElement( 'h3' );
        h3.className = "card__location";
        h3.textContent = `${city}, ${country}`;

        const p = document.createElement( 'p' );
        p.className = "card__tagline";
        p.textContent = tagline;

        const span = document.createElement( 'span' );
        span.className = "card__price";
        span.textContent = `${price}€/jour`;

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(span);
        a.appendChild(img);
        a.appendChild(div);

        return (a);
    }

    return { id, name, picture, city, country, tagline, price, getUserCardDOM }
}