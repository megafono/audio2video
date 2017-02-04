class EmbedComponent {
  constructor(container) {
    this.code = container.querySelector('.js-embed__code');
    this.controls = Array.from(container.querySelectorAll('.js-embed__control'));
    this.preview = container.querySelector('.js-embed__preview');
    this.embedRootURL = container.dataset.embedUrl;
    this.generate();
    this.bind();
  }

  bind() {
    this.controls.forEach((control) => {
      control.addEventListener('keyup', () => this.generate());
      control.addEventListener('change', () => this.generate());
    });
  }

  generate() {
    let embedURL = this.embedRootURL
    let width, height;

    for (var i = 0; i < this.controls.length; i++) {
      var control = this.controls[i];
      if(control.name === 'width') {
        this.preview.width = control.value;
      } else if (control.name === 'height') {
        this.preview.height = control.value;
      }
    }

    this.preview.src = embedURL;
    this.code.value = this.createCode();
  }

  createCode() {
    let target = this.preview.cloneNode(true);
    target.removeAttribute('class');
    return target.outerHTML;
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.js-embed').each((_i, el) => (new EmbedComponent(el)));
});
