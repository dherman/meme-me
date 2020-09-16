export default class StandardMeme {
  constructor(id, onSelect) {
    let element = document.getElementById(id);
    this.element = element;
    this.element.addEventListener('click', () => onSelect(this));
  }

  select() {
    this.element.classList.add('selected');
  }

  unselect() {
    this.element.classList.remove('selected');
  }

  generate(top, bottom, meme) {
    let url = `./standard?id=${this.element.id}`;

    if (top) {
      top = encodeURI(top);
      url += `&top=${top}`;
    }
  
    if (bottom) {
      bottom = encodeURI(bottom);
      url += `&bottom=${bottom}`;
    }
  
    meme.setSync(url);
  }
}
