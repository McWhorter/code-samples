import Keyboard from 'keyboard-key';

/**
 * Default options
 *
 * @prop {String || HTMLElement} button - A selector string or passed in element.
 * @prop {String || HTMLElement} panel - A selector string or passed in element.
 * @prop {String || HTMLElement} close - A selector string or passed in element.
 */

const defaults = {
  button: '.node-button',
  panel: '.node-panel',
  close: '.btn-close',
};

export default class PanelGroup {
  constructor(element, options) {
    this.element = element;
    this.expanded = false;
    this.selectors = { ...defaults, ...options };
    this.hasClose = this.closeButton;
    this.addEventListeners();
  }

  keydownHandler(event) {
    const key = Keyboard.getCode(event);
    if (key === Keyboard.Escape && this.expanded) {
      this.deactivate();
    }
  }

  clickHandler() {
    return this.expanded ? this.deactivate() : this.activate();
  }

  closeHandler() {
    return this.deactivate();
  }

  activate() {
    this.expanded = true;
    this.updateView();
    this.element.dispatchEvent(new CustomEvent('expanded', { bubbles: true }));
  }

  deactivate() {
    this.expanded = false;
    this.updateView();
    this.element.dispatchEvent(new CustomEvent('collapsed', { bubbles: true }));
  }

  updateView() {
    this.panel.setAttribute('aria-hidden', !this.expanded);
    this.button.setAttribute('aria-expanded', this.expanded);
    if (this.hasClose) {
      this.closeButton.setAttribute('aria-expanded', this.expanded);
    }
  }

  get button() {
    let button = this.element.querySelector(this.selectors.button);
    if (this.selectors.button instanceof HTMLElement) {
      button = this.selectors.button;
    }
    return button;
  }

  get panel() {
    let panel = this.element.querySelector(this.selectors.panel);
    if (this.selectors.panel instanceof HTMLElement) {
      panel = this.selectors.panel;
    }
    return panel;
  }

  get closeButton() {
    let close = this.element.querySelector(this.selectors.close) || false;
    if (this.selectors.close instanceof HTMLElement) {
      close = this.selectors.close;
    }
    return close;
  }

  addEventListeners() {
    window.addEventListener('keydown', this.keydownHandler.bind(this));
    this.button.addEventListener('click', this.clickHandler.bind(this));
    if (this.hasClose) {
      this.closeButton.addEventListener('click', this.closeHandler.bind(this));
    }
  }
}
