class PlayerComponent {
  constructor(root) {
    this.root = root;
    this.receiver = new playerjs.Receiver();
    soundManager.setup({
      onready: () => {
        this.ready();
      },
      multiShot: false
    });
  }

  get(element) {
    return this.root.querySelector(`.js-player__${element}`);
  }

  ready() {
    this.loop = false;

    this.sound = soundManager.createSound({
      id: 'currentEpisode',
      url: this.root.dataset.source,
      autoPlay: this.root.dataset.autoplay === "true",
      onplay: () => {
        this.receiver.emit('play');
        this.get('play-pause').classList.remove('player__play-pause--paused');
        this.get('play-pause').classList.add('player__play-pause--playing');
      },

      onresume: () => {
        this.receiver.emit('play');
      },

      onpause: () => {
        this.receiver.emit('pause');
        this.get('play-pause').classList.remove('player__play-pause--playing');
        this.get('play-pause').classList.add('player__play-pause--paused');
      },

      whileplaying: () => {
        let episode = soundManager.getSoundById('currentEpisode');

        this.get('current-time').textContent = this.formatMilliseconds(episode.position);

        let playing = (100 * episode.position) / episode.duration;

        this.get('visualzation-status').style.width = `${playing}%`

        this.receiver.emit('timeupdate', {
          duration: episode.duration,
          seconds: episode.position
        });
      },

      whileloading: () => {
        let episode = soundManager.getSoundById('currentEpisode');
        let loaded = (100 * episode.bytesLoaded) / episode.bytesTotal
        this.get('visualzation-loaded').style.width = `${loaded}%`
      },

      onfinish: () => {
        this.receiver.emit('ended');
        if(this.loop) {
          this.sound.play();
        }
      }
    });

    this.bindButtons();
    this.bindReceiver();
  }

  bindReceiver() {
    this.receiver.on('play', () => {
      this.sound.play();
    });

    this.receiver.on('pause', () => {
      this.sound.pause();
    });

    this.receiver.on('getPaused', (callback) => {
      callback(this.sound.paused);
    });

    this.receiver.on('mute', () => {
      this.sound.mute();
    });

    this.receiver.on('unmute', () => {
      this.sound.unmute();
    });

    this.receiver.on('getMuted', (callback) => {
      callback(this.sound.muted);
    });

    this.receiver.on('getVolume', (callback) => {
      callback(this.sound.volume);
    });

    this.receiver.on('setVolume', (value) => {
      this.sound.setVolume(value);
    });

    this.receiver.on('getDuration', (callback) => {
      callback(this.sound.duration);
    });

    this.receiver.on('setCurrentTime', (value) => {
      this.sound.setPosition(value);
    });

    this.receiver.on('getCurrentTime', (callback) => {
      callback(this.sound.position);
    });

    this.receiver.on('setLoop', (value) => {
      this.loop = value;
    });

    this.receiver.on('getLoop', (callback) => {
      callback(this.loop);
    });

    this.receiver.ready();
  }

  bindButtons() {
    this.get('play-pause').addEventListener('click', () => {
      soundManager.togglePause('currentEpisode');
    });
  }

  formatMilliseconds(milliseconds) {
    var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    return (hours > 0 ? hours : '00') + ':' +
           (minutes < 10 ? '0' : '') + minutes + ':' +
           (seconds < 10 ? '0' : '') + seconds ;
  }

}

document.addEventListener("turbolinks:load", function() {
  soundManager.destroySound('currentEpisode');
  $('.js-player').each((_i, el) => (new PlayerComponent(el)));
});
