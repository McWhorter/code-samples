import FlickityCore from 'flickity';

class Flickity extends FlickityCore {
  playPlayer() {
    super.playPlayer();
    this.dispatchEvent('playing', null);
  }

  pausePlayer() {
    super.pausePlayer();
    this.dispatchEvent('paused', null);
  }

  stopPlayer() {
    super.stopPlayer();
    this.dispatchEvent('stopped', null);
  }

  destroy() {
    this.dispatchEvent('destroy', null);
    super.destroy();
  }
}

export default Flickity;
