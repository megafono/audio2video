class ModalComponent {
  constructor(container) {
    this.closeButton = container.querySelector('.js-modal__close');
    this.openButton = document.querySelector('.js-modal__open');
    this.container = container;
    this.bind();
  }

  bind() {
    this.closeButton.addEventListener('click', () => this.close());
    this.openButton.addEventListener('click', () => this.open());
  }

  close() {
    this.container.classList.add('modal--hidden');
  }

  open() {
    this.container.classList.remove('modal--hidden');
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.js-modal').each((_i, el) => (new ModalComponent(el)));
});
