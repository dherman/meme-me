import Gallery from './gallery.js';
import MemeText from './meme-text.js';
import ImageContainer from './image-container.js';
import Meme from './meme.js';

let gallery = new Gallery({
  standard: ['kermit', 'grumpy', 'bizcat'],
  custom: 'custom',
  onSelect: () => { button.disabled = false; }
});
let topText = new MemeText('top-text', 'Top text');
let bottomText = new MemeText('bottom-text', 'Bottom text');
let button = document.getElementById('meme-me');
let meme = new Meme('meme');

button.addEventListener('click', event => {
  let top = topText.value();
  let bottom = bottomText.value();
  gallery.getSelection().generate(top, bottom, meme);
});
