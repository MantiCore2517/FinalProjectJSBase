import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';
    this.state = { sum: 0 };

    const heading = document.createElement('h1');
    heading.className = 'total-amount';
    heading.textContent = `Итого: $${this.state.sum}`;
    this.$heading = heading;

    const donateList = new List({callback: this.onItemDelete.bind(this)});
    const donateForm = new Form({root: donateList, callback: this.onItemCreate.bind(this)});

    this.render([
      heading,
      donateForm.$rootElement,
      donateList.$rootElement
    ]);
      
  };
  
  onItemCreate(element, time, value, id) {
    element.addItem({time: time, sum: value, id: (id + value.toString())});
    document.querySelectorAll('.donate-item').forEach(i => i.remove());
      
    const $items = element.items.map(i => new ListItem(i).$rootElement);
    this.render([$items], element.$rootElement);
    
    this.state.sum = 0;
    element.items.forEach(item => this.state.sum += parseInt(item.sum))
    this.$heading.textContent = `Итого: $${this.state.sum}`;
  };

  onItemDelete(id){
    const elementToDelete = document.getElementById(id);
    
    const sumToDelete = Number(elementToDelete.querySelector('.sum').textContent.slice(1));
    const heading = document.querySelector('.total-amount');
    const i = heading.textContent.indexOf('$');
    const currentSum = heading.textContent.slice(i+1)
    heading.textContent = `Итого: $${currentSum-sumToDelete}`
    
    elementToDelete.style.cssText = 
    'max-height: 0; transform: scale(1, 0); opacity: 0; padding: 0; transition: .4s'
        
    setTimeout(() => {
      elementToDelete.remove();
    }, 400)
  };
}
