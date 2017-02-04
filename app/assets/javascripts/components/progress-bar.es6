class ProgressBarComponent  {
  constructor(element) {
    this.element = element;
    this.currentElement = this.element.querySelector('.progress-bar__current');
    this.start();
  }

  start() {
    const percent = (
      parseInt(this.element.dataset.currentValue) / parseInt(this.element.dataset.total)
    ) * 100;
    this.currentElement.style.width = percent + "%";
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.js-progress-bar').each((_i, el) => (new ProgressBarComponent(el)));
});
