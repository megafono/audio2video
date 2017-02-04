class TextCounterComponent {
  constructor(element) {
    this.element = element;
    this.target = document.querySelector(element.dataset.target);
    this.update();
    this.target.addEventListener('trix-change', () => this.update())
  }

  update() {
    let editor = this.target.editor;
    let length = editor.element.value.length;
    this.element.textContent = length;
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.js-text-counter').each((_i, el) => (new TextCounterComponent(el)));
});
