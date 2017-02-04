class ShowMoreComponent  {
  constructor(element) {
    this.element = element;
    this.stateText = element.querySelector('.js-show-more__text');
    this.maxHeight = 200;

    if(this.isElementBigger()) {
      this.bindStateClick();
      this.toggleState();
    } else {
      this.stateText.remove();
    }
  }

  isElementBigger() {
    return (this.element.clientHeight - this.stateText.clientHeight) > this.maxHeight;
  }

  bindStateClick(element) {
    this.stateText.addEventListener('click', () => this.toggleState())
  }

  setOpenState() {
    this.element.classList.remove('show-more--hidden');
    this.element.style.height = 'auto';
    this.stateText.textContent = this.element.dataset.showLessText;
  }

  setCloseState() {
    this.element.classList.add('show-more--hidden');
    this.element.style.height = `${this.maxHeight}px`;
    this.stateText.textContent = this.element.dataset.showMoreText;
  }

  toggleState() {
    this.isClosed() ? this.setOpenState() : this.setCloseState();
  }

  isClosed() {
    for (var i = this.element.classList.length - 1; i >= 0; i--) {
      return this.element.classList[i] === 'show-more--hidden';
    }
    return false;
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.js-show-more').each((_i, el) => (new ShowMoreComponent(el)));
});
