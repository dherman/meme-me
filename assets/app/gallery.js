import CustomMeme from './custom-meme.js';
import StandardMeme from './standard-meme.js';

export default class Gallery {
  constructor({ standard, custom, onSelect = () => { } }) {
    this.standard = standard.map(id => {
      return new StandardMeme(id, item => this._select(item));
    });
    this.custom = new CustomMeme(custom, item => this._select(item));
    this.selected = null;
    this.onSelect = onSelect;
  }

  _select(item) {
    if (this.selected === item) {
      return;
    }

    if (this.selected) {
      this.selected.unselect();
    }

    item.select();

    this.selected = item;

    this.onSelect();
  }

  getSelection() {
    if (!this.selected) {
      throw new Error('no selection');
    }

    return this.selected;
  }
}
