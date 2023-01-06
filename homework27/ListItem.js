import State from './State.js';

class ListItem {        //красная рамка, наши li
  constructor(obj) {

    this.text = obj.text;
    this.checked = obj.checked;
    this.editable = obj.editable;
    this.id = obj.id;

    this.state = State.getInstance();

    this.checkedToDoItem = this.checkedToDoItem.bind(this);
    this.editToDoItem = this.editToDoItem.bind(this);
    this.removeToDoItem = this.removeToDoItem.bind(this);
    this.saveToDoItem = this.saveToDoItem.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  };

  checkedToDoItem() {
    const item = this.state.findByID(this.id);
    this.state.updateElement(this.id, {...item, checked: !item.checked})
  };

  editToDoItem() {
    const item = this.state.findByID(this.id);
    this.state.updateElement(this.id, {...item, editable: true})
  }

  removeToDoItem() {
    this.state.deleteElement(this.id)
  };

  saveToDoItem() {
    const item = this.state.findByID(this.id);

    this.state.updateElement(this.id, { ...item, text: this.text, editable: false });
  }

  cancel() {
    const item = this.state.findByID(this.id);
    this.state.updateElement(this.id, {...item, editable: false})
  }

  handleChangeText(event) {
      this.text = event.target.value;
  }

  renderReadable() {
    const item = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (this.checked) {
      checkbox.checked = 'checked';
    }
    checkbox.addEventListener('click', this.checkedToDoItem);

    const span = document.createElement('span');
    span.innerText = this.text;
    if (this.checked == true) {
      span.classList.toggle('checked')
    }

    const buttonEdit = document.createElement('button');
    buttonEdit.innerText = 'Edit';
    buttonEdit.addEventListener('click', this.editToDoItem);

    const buttonRemove = document.createElement('button');
    buttonRemove.innerText = 'Remove';
    buttonRemove.addEventListener('click', this.removeToDoItem);


    item.append(checkbox, span, buttonEdit, buttonRemove)

    return item
  }

  renderEditable() {
    const item = document.createElement('li');
    item.dataset.id = this.id;

    const input = document.createElement('input');
    input.value = this.text;
    input.addEventListener('input', this.handleChangeText)

    const buttonSave = document.createElement('button');
    buttonSave.innerText = 'Save';
    buttonSave.addEventListener('click', this.saveToDoItem)

    const buttonCancel = document.createElement('button');
    buttonCancel.innerText = 'Cancel';
    buttonCancel.addEventListener('click', this.cancel)

    item.append(input, buttonSave, buttonCancel);

    return item;
  }

  render() {
    if (this.editable) {
      return this.renderEditable()
    } else {
      return this.renderReadable()
    }
  }


}

export default ListItem;
