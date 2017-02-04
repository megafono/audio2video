class ChangeWordComponent {
  constructor(element) {
    this.element = element
    this.words = element.dataset.words ? element.dataset.words.split(",") : []
  }

  start() {
    if(this.words.length > 1) {
      this.currentIndex = 0
      this.schedule();
    }
  }

  next() {
    let word = this.words[this.currentIndex];
    this.element.textContent = word;

    this.currentIndex = this.currentIndex + 1
    if(this.currentIndex === this.words.length)
      this.currentIndex = 0

    this.schedule();
  }

  schedule() {
    setTimeout(() => { this.next() }, 1500)
  }
}


document.addEventListener("turbolinks:load", function() {
  $('.js-change-word').each((_i, el) => (new ChangeWordComponent(el)).start());
});
