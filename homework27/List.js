import ListItem from './ListItem.js';
import State from './State.js';

class List {         //голубая рамка, наша ul
  constructor() {
    this.state = State.getInstance();
  }

  render1() {
    const toDoList = document.createElement('ul');
    const items = this.state.getState().map(s => new ListItem(s, this.state));
    const rendered = items.map(item => item.render());
    return [toDoList, ...rendered]
  }

  renderSearch() {
    const toDoList = document.createElement('ul');
    const items = this.state.getSearch().map(item => new ListItem(item, this.state));
    const rendered = items.map(item => item.render());
    return [toDoList, ...rendered]
  }


  render() {
    if (this.state.getSearch().length === 0) {
      return this.render1()
    } else {
      return this.renderSearch(this.state.getSearch())
    }
  }
}
export default List;
