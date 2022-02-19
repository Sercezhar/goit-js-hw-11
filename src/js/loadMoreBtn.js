export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.btnText = document.querySelector('.btn-text');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.btnText.textContent = 'Load more';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.btnText.textContent = 'Loading...';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}