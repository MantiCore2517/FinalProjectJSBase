import { Component } from '../core/Component';

export class List extends Component {
  constructor(props = {}){
    super(props);
    this.items = [];
    this.$emptyMessage = null;
  }

  setup(props) {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';
    this.$rootElement.addEventListener('click', event => this.handleDeleteClick(event, props.callback));

    this.$emptyMessage = document.createElement('div');
    this.$emptyMessage.className = 'donates-container__empty-message';
    this.$emptyMessage.textContent = 'Донатов еще не было :(('

    const heading = document.createElement('h2');
    heading.className ='donates-container__title';
    heading.textContent = 'Список донатов';
        
    this.render([
      heading,
      this.$emptyMessage
    ]);
  }

  addItem(props = {}) {
    const item ={
      time: props.time,
      sum: props.sum,
      id: props.id
    }

    this.items.unshift(item);

    const $message = document.querySelector('.donates-container__empty-message')
    $message && $message.remove();
  }

  deleteItem(id){
    
    const index = this.items.findIndex((item) => {
      item.id = id;
    })

    this.items.splice(index, 1);
    const allDonatesDeleted = document.createElement('div');
    allDonatesDeleted.className = 'donates-container__empty-message';
    allDonatesDeleted.textContent = 'Упс, Вы удалили все записи о донатах!'
    this.items.length === 0 && this.render([allDonatesDeleted]);
  }
  
  handleDeleteClick(event, callback){
    event.preventDefault();
    let id = '';
    const {target} = event;
    const isDonateDeleteButton = target.closest('.delete-button');
    if (isDonateDeleteButton) {
      id = isDonateDeleteButton.closest('.donate-item').id;
    }

    this.deleteItem(id);
    callback(id);
  }
}