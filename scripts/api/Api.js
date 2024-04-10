// Définition de la classe de base Api pour effectuer des requêtes HTTP
class Api {
    constructor(url) {
        this._url = url;
    }

    // Méthode pour effectuer une requête GET et récupérer les données
    async get() {
        try {
            // Effectue la requête GET en utilisant fetch
            const response = await fetch(this._url);
            // Vérifie si la réponse est OK (200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse la réponse JSON et retourne les données
            const data = await response.json();
            return data;
        } catch (error) {
            // En cas d'erreur, lance une nouvelle exception avec un message explicite
            throw new Error(`Error fetching data from ${this._url}: ${error.message}`);
        }
    }
}

// Classe spécialisée pour gérer les appels API liés aux photographes
export class PhotographerApi extends Api {
    constructor(url) {
        // Appelle le constructeur de la classe de base avec l'URL fournie
        super(url);
    }

    // Méthode pour récupérer les données des photographes en utilisant la méthode get de la classe de base
    async getPhotographers() {
        // Appelle la méthode get de la classe de base et retourne les données
        return await this.get();
    }
}