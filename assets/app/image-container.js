export default class ImageContainer {
  constructor(id) {
    this.id = id;
    this.element = document.getElementById(id);
    this.current = null;
  }

  insertBlob(blob, buffer = null) {
    let objectURL = URL.createObjectURL(blob);

    this._insert(objectURL, { blob, buffer, objectURL });
  }

  insertURL(url) {
    this._insert(url, { });
  }

  _insert(url, current) {
    let image = new Image();
    image.src = url;

    current.image = image;

    let previous = this.current;
    this.current = current;

    this.element.classList.remove('empty');
    this.element.innerHTML = '';
    this.element.appendChild(image);

    if (previous && previous.objectURL) {
      URL.revokeObjectURL(previous.objectURL);
    }
  }

  getCurrent() {
    return this.current;
  }

  isEmpty() {
    return !this.current;
  }
}
