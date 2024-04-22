class MediaModel {
  /**
   * Crée une instance de MediaModel à partir des données fournies.
   * @param {Object} data - Les données du média.
   * @param {Object} photographer - Le photographe associé au média.
   */
  constructor(data, photographer) {
    const { id, title, likes, date, price } = data;
    this._id = id;
    this._photographer = photographer;
    this._title = title;
    this._likes = likes;
    this._date = date;
    this._price = price;
    this._isLike = false;
  }

  get id() {
    return this._id;
  }

  get photographer() {
    return this._photographer;
  }

  get title() {
    return this._title;
  }

  get isLike() {
    return this._isLike;
  }

  get likes() {
    return this._likes;
  }

  addLike() {
    this._likes += 1;
    this._isLike = true;
    this._photographer.addLike();
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
}

class ImageModel extends MediaModel {
  /**
   * Crée une instance de ImageModel à partir des données fournies.
   * @param {Object} data - Les données du média.
   * @param {Object} photographer - Le photographe associé au média.
   */
  constructor(data, photographer) {
    super(data, photographer);
    const { image } = data;
    const [firstName] = this._photographer.name.split(' ');
    this._type = 'image';
    this._url = `./assets/images/${firstName}/${image}`;
  }

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }
}

class VideoModel extends MediaModel {
  /**
   * Crée une instance de VideoModel à partir des données fournies.
   * @param {Object} data - Les données du média.
   * @param {Object} photographer - Le photographe associé au média.
   */
  constructor(data, photographer) {
    super(data, photographer);
    const { video } = data;
    const [firstName] = this._photographer.name.split(' ');
    this._type = 'video';
    this._url = `./assets/images/${firstName}/${video}`;
  }

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }
}

export { ImageModel, VideoModel };
