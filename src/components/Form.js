import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';
    this.$rootElement.addEventListener('submit', event => this.handleSubmit(event, props.root, props.callback))

    const heading = document.createElement('p');
    heading.className = 'donate-form__input-label'
    heading.textContent = 'Введите сумму в $';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'donateSum';
    input.className = 'donate-form__donate-input';
    input.placeholder = 'Только число от 1 до 100'

    const btn = document.createElement('input');
    btn.type = 'submit';
    btn.name = 'submitButton';
    btn.className = 'donate-form__submit-button';
    btn.textContent = 'Задонатить';
    btn.disabled = true;
    
    input.addEventListener('input', (event) => {
      this.handleInput(event, btn);
    });

    this.render([
      heading,
      input,
      btn
    ]);
  }

  handleInput(event, btn) {
    btn.disabled = !(Number(event.target.value.trim()) >= 1 && Number(event.target.value.trim()) <= 100);
  }

  handleSubmit(event, $root, callback) {
    event.preventDefault();
    const id = Math.random().toString(16).slice(2);
    const dateTime = new Date(Date.now()).toLocaleString();
    
    const {target} = event;
    const valueToAdd = target.donateSum.value.trim();
    target.submitButton.disabled = true;
    target.donateSum.value = '';
      
    callback($root, dateTime, valueToAdd, id);
  }
}
