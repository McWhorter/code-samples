import merge from 'deepmerge';

const defaults = {
  playPause: {
    wrapperTag: 'li',
    attachTo: '.flickity-page-dots',
    shape: '<svg xmlns="http://www.w3.org/2000/svg" class="play-pause-icon" width="30" height="30" viewBox="0 0 30 30"><title>Play / Pause button</title><path class="play" d="M26.27,13.74,9.2,4.19a1.5,1.5,0,0,0-2,.51,1.43,1.43,0,0,0-.2.73V24.57A1.44,1.44,0,0,0,8.45,26a1.61,1.61,0,0,0,.75-.19l17.07-9.6a1.4,1.4,0,0,0,.53-2A1.55,1.55,0,0,0,26.27,13.74Z"/><g class="pause"><path d="M11.72,24H8.28A1.24,1.24,0,0,1,7,22.79V7.26A1.27,1.27,0,0,1,8.28,6h3.44A1.27,1.27,0,0,1,13,7.26V22.79A1.24,1.24,0,0,1,11.75,24Z"/><path d="M21.72,24H18.28A1.24,1.24,0,0,1,17,22.79V7.26A1.27,1.27,0,0,1,18.28,6h3.44A1.27,1.27,0,0,1,23,7.26V22.79A1.27,1.27,0,0,1,21.72,24Z"/></g></svg>',
  },
};

export default class PlayPause {
  constructor(element, slider, options = {}) {
    this.element = element;
    this.slider = slider;
    this.settings = merge(defaults, options);

    // Normalizes the playPause options.
    if (typeof options.playPause === 'boolean') {
      this.settings = merge(options, defaults);
    }

    // Adds play / pause controls
    this.playPauseButton = this.addButton();

    // Add Listeners
    this.listen();
  }

  addButton() {
    const button = document.createElement('button');
    button.className = 'button--play-pause';
    button.innerHTML = this.settings.playPause.shape;
    button.addEventListener('click', this.playPauseHandler.bind(this));
    if (this.settings.playPause.wrapperTag) {
      const wrapper = document.createElement(this.settings.playPause.wrapperTag);
      wrapper.appendChild(button);
      this.destination.appendChild(wrapper);
    } else {
      this.destination.appendChild(button);
    }
    return button;
  }

  playPauseHandler() {
    if (this.element.classList.contains('playing')) {
      this.slider.pausePlayer();
    } else {
      this.slider.playPlayer();
    }
  }

  setPlayingState() {
    this.playPauseButton.setAttribute('aria-label', 'Stop the slider\'s autoscroll');
    this.element.classList.add('playing');
  }

  setPausedState() {
    this.playPauseButton.setAttribute('aria-label', 'Start the slider\'s autoscroll');
    this.element.classList.remove('playing');
  }

  listen() {
    this.slider.on('playing', this.setPlayingState.bind(this));
    this.slider.on('stopped', this.setPausedState.bind(this));
    this.slider.on('paused', this.setPausedState.bind(this));
    this.slider.on('destroy', this.destroy.bind(this));
  }

  destroy() {
    this.slider.off('playing', this.setPlayingState.bind(this));
    this.slider.off('stopped', this.setPausedState.bind(this));
    this.slider.off('paused', this.setPausedState.bind(this));
    this.slider.off('destroy', this.destroy.bind(this));

    if (this.playPauseButton) {
      this.playPauseButton.removeEventListener('click', this.playPauseHandler.bind(this));
      if (this.settings.playPause.wrapperTag) {
        this.playPauseButton.parentNode.remove();
      } else {
        this.playPauseButton.remove();
      }
    }
  }

  get destination() {
    return this.element.querySelector(this.settings.playPause.attachTo) || this.element;
  }
}
