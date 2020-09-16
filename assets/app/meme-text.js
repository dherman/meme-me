
export default class MemeText {
    constructor(id, defaultText) {
      this.id = id;
      let element = document.getElementById(id);
      this.element = element;
      this.defaultText = defaultText;
  
      element.addEventListener('focus', event => {
        if (element.classList.contains('empty')) {
          element.value = "";
          element.classList.remove('empty');
        }
      });
  
      element.addEventListener('blur', event => {
        if (!element.value) {
          element.classList.add('empty');
          element.value = this.defaultText;
        }
      });
    }
  
    value() {
      return this.element.classList.contains('empty')
        ? null
        : this.element.value;
    }
  }
