import List from './List.js';
import State from './State.js';

class Controller {     //синяя рамка, то что управляет нашими тудушками

  inputRef;
  inputSearch;

  constructor () {
    this.state = State.getInstance();
  }

  validate(){

    console.log('inputList validate', )
  }

  addToDoItem(){

    if (this.inputRef.value) {
      this.state.addElement({
        text: this.inputRef.value,
        checked: false,
        editable: false,
        id: new Date(),
      })
      this.inputRef.value = '';
    }
  }

  clearALL() {
    const items = this.state.getState().map(s => s);
    items.map(elem => this.state.deleteElement(elem.id))
  }

  searchToDoItem() {
    const items = this.state.getState().filter(s => s.text.includes(this.inputSearch.value));
    this.state.getSearch().length = 0
    items.map(elem => this.state.addSearch(elem))
  }

  updateList() {
    this.state.getSearch().length = 0
    const items = this.state.getState().map(s => s);
    items.map(elem => this.state.deleteElement(elem.id))
    items.map(elem => this.state.addElement(elem))
    this.render()
  }

  sortByMin() {
    const items = this.state.getState().map(s => s);
    const sortArray = items.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    })
    const allitems = this.state.getState().map(s => s);
    allitems.map(elem => this.state.deleteElement(elem.id))
    sortArray.map(elem => this.state.addElement(elem))

  }
  sortByMax() {
    const items = this.state.getState().map(s => s);
    const sortArray = items.sort(function (a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
    return 0;
  })
    const allitems = this.state.getState().map(s => s);
    allitems.map(elem => this.state.deleteElement(elem.id))
    sortArray.map(elem => this.state.addElement(elem))

}

  render() {
    this.inputRef = document.createElement('input');
    this.inputRef.addEventListener('input', this.validate);

    const addList = document.createElement('button');
    addList.innerText = 'Add';
    addList.addEventListener('click', this.addToDoItem.bind(this));

    const buttonClearAll = document.createElement('button');
    buttonClearAll.innerText = 'Clear all';
    buttonClearAll.addEventListener('click', this.clearALL.bind(this));

    const update = document.createElement('button');
    update.innerText = 'Update';
    update.addEventListener('click', this.updateList.bind(this));

    this.inputSearch = document.createElement('input');
    this.inputSearch.placeholder = "search text";
    // this.inputSearch.oninput = deleteSymbol.bind(this);
    const buttonSearch = document.createElement('button');
    buttonSearch.innerText = 'Search';
    buttonSearch.addEventListener('click', this.searchToDoItem.bind(this));

    const sortBtnMin = document.createElement('input');
    sortBtnMin.type = 'radio';
    sortBtnMin.name = 'min-max';
    sortBtnMin.id = 'min';
    const labelMin = document.createElement('label');
    labelMin.innerHTML = 'sort min';
    sortBtnMin.addEventListener('click', this.sortByMin.bind(this));

    const sortBtnMax = document.createElement('input');
    sortBtnMax.type = 'radio';
    sortBtnMax.name = 'min-max';
    sortBtnMax.id = 'max';
    const labelMax = document.createElement('label');
    labelMax.innerHTML = 'sort max';
    sortBtnMax.addEventListener('click', this.sortByMax.bind(this)); ;

    return [this.inputRef, addList, buttonClearAll, update, this.inputSearch, buttonSearch, labelMin, sortBtnMin, labelMax, sortBtnMax];
  }
}

export default Controller;
