import ImageContainer from './image-container.js';

export default class Meme {
  constructor(id) {
    this.container = new ImageContainer(id);
  }

  setSync(url) {
    this.container.insertURL(url);
  }

  async setAsync(p, naturalWidth, naturalHeight) {
    let height = Math.min(naturalHeight, 300);
    let ratio = height / naturalHeight;
    let width = ratio * naturalWidth;
    this.container.element.innerHTML = '';
    this.container.element.style.height = `${height}px`;
    this.container.element.style.width = `${width}px`;
    this.container.element.classList.add('loading');
    let blob = await p;
    this.container.element.classList.remove('loading');
    this.container.element.style.height = null;
    this.container.element.style.width = null;
    this.container.insertBlob(blob);
  }
}
