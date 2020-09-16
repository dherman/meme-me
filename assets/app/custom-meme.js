import ImageContainer from './image-container.js';
import Meme from './meme.js';

// Drag-and-drop tutorial: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

export default class CustomMeme {
  constructor(id, onSelect) {
    this.container = new ImageContainer(id);
    this.container.element.addEventListener('click', () => {
      if (this.container.isEmpty()) {
        return;
      }

      onSelect(this);
    });
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.container.element.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach(eventName => {
      this.container.element.addEventListener(eventName, this._highlight.bind(this), false);
    });
    ['dragleave', 'drop'].forEach(eventName => {
      this.container.element.addEventListener(eventName, this._unhighlight.bind(this), false);
    });
    this.container.element.addEventListener('drop', event => {
      this._receiveFiles(event.dataTransfer.files);
    }, false);
  }

  _highlight() {
    this.container.element.classList.add('dragging');
  }

  _unhighlight() {
    this.container.element.classList.remove('dragging');
  }

  _receiveFiles(files) {
    files[0]
      .arrayBuffer()
      .then(buffer => {
        this.container.insertBlob(files[0], buffer);
      });
  }

  select() {
    this.container.element.classList.add('selected');
  }

  unselect() {
    this.container.element.classList.remove('selected');
  }

  generate(top, bottom, meme) {
    let current = this.container.getCurrent();
    let p = fetch('/custom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Meme-Top-Text': top || "",
        'X-Meme-Bottom-Text': bottom || ""
      },
      body: current.buffer
    }).then(response => response.blob());
    meme.setAsync(p, current.image.naturalWidth, current.image.naturalHeight);
  }
}
