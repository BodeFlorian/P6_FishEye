class Lightbox {
    /**
     * Crée une instance de Lightbox.
     * @param {HTMLElement} currentMedia - L'élément média actuel dans la galerie.
     * @param {Array<HTMLElement>} gallery - La galerie complète d'éléments média.
     * @throws {Error} Lance une erreur si les arguments ne sont pas valides ou si l'élément média actuel n'est pas trouvé dans la galerie.
     */
    constructor(currentMedia, gallery) {
        if (!currentMedia || !gallery || gallery.length === 0) {
            throw new Error('Invalid arguments provided');
        }

        this._currentMedia = currentMedia;
        this._gallery = gallery;

        this._currentIndex = this._gallery.findIndex(media => media.querySelector('img, video') === this._currentMedia);

        if (this._currentIndex === -1) {
            throw new Error('Current media not found in the gallery');
        }

        this.#initializeDOMElements();
    }

    /**
     * Initialise les éléments DOM de la lightbox.
     * @private
     */
    #initializeDOMElements() {
        const section = document.createElement('section');
        section.innerHTML =
        `
            <section class="lightbox">
              <button class="lightbox__close" name="close"></button>
              <button class="lightbox__next" name="next"></button>
              <button class="lightbox__prev" name="prev"></button>
              <div class="lightbox__container">
              </div>
            </section>
        `;

        this.lightboxContainer = section.querySelector('.lightbox__container');
        this.lightboxCloseButton = section.querySelector('.lightbox__close');
        this.lightboxNextButton = section.querySelector('.lightbox__next');
        this.lightboxPrevButton = section.querySelector('.lightbox__prev');

        this.lightboxCloseButton.addEventListener('click', () => this.closeLightbox());
        this.lightboxNextButton.addEventListener('click', () => this.showNextMedia());
        this.lightboxPrevButton.addEventListener('click', () => this.showPreviousMedia());

        document.querySelector('body').appendChild(section);

        // Met à jour le média actuel
        this.#updateMedia();
    }

    /**
     * Met à jour les éléments de la lightbox avec le média actuel.
     * @private
     */
    #updateMedia() {
        this.lightboxContainer.innerHTML = '';

        const currentGalleryItem = this._gallery[this._currentIndex].querySelector('img, video');

        // Vérifie si le média actuel est une vidéo ou une image
        if (currentGalleryItem.tagName === 'VIDEO') {
            const video = document.createElement('video');
            video.src = currentGalleryItem.src;
            video.controls = true;
            this.lightboxContainer.appendChild(video);
        } else if (currentGalleryItem.tagName === 'IMG') {
            const img = document.createElement('img');
            img.src = currentGalleryItem.src;
            img.alt = currentGalleryItem.alt;
            const p = document.createElement('p');
            p.innerText = currentGalleryItem.alt;
            this.lightboxContainer.appendChild(img);
            this.lightboxContainer.appendChild(p);
        }
    }


    /**
     * Affiche le média suivant dans la lightbox.
     * @returns {void}
     */
    showNextMedia() {
        this._currentIndex = (this._currentIndex + 1) % this._gallery.length;
        this.#updateMedia();
    }

    /**
     * Affiche le média précédent dans la lightbox.
     * @returns {void}
     */
    showPreviousMedia() {
        this._currentIndex = (this._currentIndex - 1 + this._gallery.length) % this._gallery.length;
        this.#updateMedia();
    }

    /**
     * Ferme la lightbox en supprimant son élément DOM parent.
     * @returns {void}
     */
    closeLightbox() {
        this.lightboxContainer.parentNode.remove();
    }
}

export default Lightbox;