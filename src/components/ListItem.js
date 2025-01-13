import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';
    this.$rootElement.id = `${props.id}`
    this.$rootElement.innerHTML = `<span> ${this.props.time} - <b class="sum">$${this.props.sum}</b> </span>`
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-button';
    delBtn.textContent = 'Удалить';
    

    this.render([delBtn]);
  }

  
}
