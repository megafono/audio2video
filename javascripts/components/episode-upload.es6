class EpisodeUploadComponent  {
  constructor(form) {
    this.form = form;
    this.fileField().addEventListener('change', (e) => this.uploadHandler());
  }

  fileField() {
    return this.form.querySelector('.js-episode-upload__file');
  }

  uploadHandler() {
    let fileField = this.fileField();
    let file = fileField.files[0];
    if(file === null) return;

    if(!this.isValid(file)) {
      this.setStatus('fail', 'Por favor insira um arquivo do tipo mp3');
      return;
    }

    this.setStatus('pending', 'Subindo arquivo...');

    let presignUrl = `${this.form.dataset.presignurl}?file_name=audio.mp3`;
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', presignUrl);
    xhr.onload = () => {
      if (xhr.status === 200) {
        this.fillMetadata(file);
        let body = JSON.parse(xhr.responseText);
        this.upload(file, body);
      }
      if (xhr.status === 500) {
        this.setStatus('fail', 'Erro no servidor, já fomos notificados e vamos trabalhar no problema');
      }
    }

    xhr.send();
  }

  setStatus(type, message) {
    let statusContainer = this.form.querySelector('.js-episode-upload__status');
    statusContainer.textContent = message;
    if (type === 'pending') {
      statusContainer.insertAdjacentHTML('afterbegin', '<div></div><div></div><div></div>');
    }
    statusContainer.classList.remove('episode-upload__status--success');
    statusContainer.classList.remove('episode-upload__status--fail');
    statusContainer.classList.remove('episode-upload__status--pending');
    statusContainer.classList.add(`episode-upload__status--${type}`);
  }

  fillMetadata(file) {
    let durationField = this.form.querySelector('#episode_duration');
    let sizeField = this.form.querySelector('#episode_media_length');
    let contentTypeField = this.form.querySelector("#episode_media_content_type");

    new AudioMetadaComponent(file, durationField, sizeField, contentTypeField);
  }

  upload(file, data) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', data.presigned_url);
    xhr.setRequestHeader('Content-Type', file.type);

    xhr.onload = () => {
      if(xhr.status === 200) {
        this.setStatus('success', 'Envio completo, clique em "Salvar episódio" abaixo');
        this.form.querySelector('[type=submit]').removeAttribute('disabled');
      }
    };

    xhr.onerror = () => {
      this.setStatus('fail', 'Erro ao enviar o arquivo');
    }

    xhr.upload.addEventListener('progress', (e) => {
      let percent = Math.floor((e.loaded/e.total) * 100);
      this.setStatus('pending', `Subindo arquivo ${percent}%`);
    });

    xhr.send(file);
  }

  isValid(file) {
    return true; // file.type === 'audio/mp3';
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.js-episode-upload').each((_i, el) => (new EpisodeUploadComponent(el)));
});
