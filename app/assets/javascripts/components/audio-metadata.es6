class AudioMetadaComponent  {
  constructor(file, durationField, lengthField, contentTypeField) {
    let objectUrl = URL.createObjectURL(file);
    let audio = document.createElement('audio');

    audio.addEventListener('canplaythrough', (e) => {
      let seconds = e.currentTarget.duration;
      if(seconds > 0) {
        durationField.value = seconds;
        durationField.classList.add('disabled');
      }
      URL.revokeObjectURL(objectUrl);
    });

    audio.setAttribute("src", objectUrl);

    if(file.size > 0) {
      lengthField.value = file.size;
      lengthField.classList.add('disabled');
    }

    if(file.type.trim() !== "") {
      contentTypeField.value = file.type;
      contentTypeField.classList.add('disabled');
    }
  }
}
