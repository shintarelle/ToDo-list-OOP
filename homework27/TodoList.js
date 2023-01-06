import List from './List.js';
import Controller from './Controller.js'
import State from './State.js';
class TodoList {    //зеленая рамка, общее наше приложение в котором контроллер и ul

  static instance = {};
  static getInstance(id) {
    if (!TodoList.instance[id]) {

      const instance = new TodoList(id);
      const state = State.getInstance();

      instance.setState(state);
      state.setRenderFn(instance.render.bind(instance));

      TodoList.instance[id] = instance;
    }
    return TodoList.instance[id];
  }

  constructor (id) {
    this.id = id;
  }

  setState(state) {
    this.state = state;
  }
  render() {
    const wrapper = document.querySelector(`#${this.id}`);
    wrapper.innerHTML = '';

    const list = new List();

    const controller = new Controller();
    wrapper.append(...controller.render(), ...list.render());
  }
}

export default TodoList;
