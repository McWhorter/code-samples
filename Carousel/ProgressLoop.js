import merge from 'deepmerge';

const defaults = {
  progressLoop: {
    attachTo: '.button--play-pause',
    shape: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle class="halo"></circle><circle class="progress"></circle></svg>',
  },
};

export default class ProgressProgressLoop {
  constructor(element, slider, options = {}) {
    this.element = element;
    this.slider = slider;
    this.settings = merge(defaults, options);

    // Normalizes the progressLoop options.
    if (typeof options.progressLoop === 'boolean') {
      this.settings = merge(options, defaults);
    }

    // Add the progress loop
    this.progressLoop = this.addProgressLoop();

    // Add Listeners
    this.listen();
  }

  addProgressLoop() {
    // Create out svg wrapper
    const progressLoop = document.createElement('div');
    progressLoop.className = 'progress-loop';
    progressLoop.innerHTML = this.settings.progressLoop.shape;

    // Add our svg to the passed element
    this.destination.appendChild(progressLoop);

    // If speed is not a number, use the flickity default value.
    const time = this.settings.autoPlay;
    const speed = typeof time === 'number' ? time : 3000;

    // Set the animation duration / speed.
    this.progress.style.animationDuration = `${speed}ms`;

    return progressLoop;
  }

  start() {
    this.progressLoop.classList.add('running');
  }

  stop() {
    this.progressLoop.classList.remove('running');
  }

  change() {
    if (this.slider.player.state === 'playing') {
      this.restart();
    }
  }

  restart() {
    this.stop();

    // @see https://css-tricks.com/restart-css-animation/#article-header-id-0
    // eslint-disable-next-line no-void
    void this.progressLoop.offsetWidth;

    this.start();
  }

  listen() {
    // Custom slider events
    this.slider.on('paused', this.stop.bind(this));
    this.slider.on('stopped', this.stop.bind(this));
    this.slider.on('playing', this.start.bind(this));
    this.slider.on('change', this.change.bind(this));
    this.slider.on('destroy', this.destroy.bind(this));

    // Mouse movements handlers
    if (this.settings.pauseAutoPlayOnHover !== false) {
      this.element.addEventListener('mouseenter', this.stop.bind(this));
      this.element.addEventListener('mouseleave', this.start.bind(this));
    }
  }

  destroy() {
    // Remove Custom slider events
    this.slider.off('paused', this.stop.bind(this));
    this.slider.off('stopped', this.stop.bind(this));
    this.slider.off('playing', this.start.bind(this));
    this.slider.off('change', this.change.bind(this));
    this.slider.off('destroy', this.destroy.bind(this));

    // Remove Mouse movements handlers
    if (this.settings.pauseAutoPlayOnHover !== false) {
      this.element.removeEventListener('mouseenter', this.stop.bind(this));
      this.element.removeEventListener('mouseleave', this.start.bind(this));
    }

    // Remove markup added.
    this.progressLoop.remove();
  }

  get progress() {
    return this.element.querySelector('.progress');
  }

  get destination() {
    return this.element.querySelector(this.settings.progressLoop.attachTo) || this.element;
  }
}
