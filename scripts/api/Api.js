class Api {
    constructor(url) {
        this._url = url;
    }

    async get() {
        try {
            const response = await fetch(this._url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data from ${this._url}: ${error.message}`);
        }
    }
}

export class PhotographerApi extends Api {
    constructor(url) {
        super(url);
    }

    async getPhotographers() {
        return await this.get();
    }
}