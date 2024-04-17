class Api {
  /**
   * Effectue une requête GET à l'URL spécifiée.
   * @param {string} url - L'URL de l'API à interroger.
   * @returns {Promise<Object>} Les données JSON récupérées de la requête.
   * @throws {Error} Si la requête échoue ou si la réponse n'est pas OK.
   */
  static async get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data from ${url}: ${error.message}`);
    }
  }
}

export class PhotographerApi extends Api {
  /**
   * Récupère les données des photographes en utilisant la méthode get de la classe de base.
   * @param {string} url - L'URL de l'API des photographes à interroger.
   * @returns {Promise<Object>} Les données des photographes récupérées.
   */
  static async getPhotographers(url) {
    return await this.get(url);
  }
}
