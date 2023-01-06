import ServerTodo from "./ServerTodo.js";
const userId = 1;
export default class State{

  #state;
  #renderFn;
  #search = [];   //? ---- завела отдельный массив для поиска чтобы изначальный список туду не перезаписывать

  static instance;
  static getInstance() {
    if (!State.instance) {
      State.instance = new State()
    }
    return State.instance;
  }

  constructor() {
    this.#state = [];
    this.setState();
  }

  async setState() {
    const responce = await ServerTodo.getToDo();
    this.#state = responce;
    this.rerender();
  }

  async addElement(item) {  //! проверь пожалуйста работу с сервером, меня смущает что я не работаю с ответами сервера
    const responce = await ServerTodo.createTodo(item.text)
    console.log(responce)
    this.#state.push(item);   // this.#state.push(responce) не работает ибо placeholder не дает менять
    this.rerender();
  }

  addSearch(item) {
    this.#search.push(item);
    this.rerender();
  }

  deleteElement(id) {
    ServerTodo.deleteTodo(id)
    const idx = this.findIndexByID(id);
    this.#state.splice(idx, 1)
    this.rerender();
  }

  deleteSearch(id) {    // удаление массива данных поиска
    const idx = this.findIndexByID(id);
    this.#search.splice(idx, 1)
    this.rerender();
  }

  async updateElement(id, item) {    //! аналогично не дает обновлять
    const responce = await ServerTodo.updateData(id, item)
    console.log(responce)
    const idx = this.findIndexByID(id);  //const idx = this.findIndexByID(responce.id) не работает
    this.#state[idx] = item;
    this.rerender();
  }

  findByID(id) {
    return this.#state.find(i => i.id === id)
  }

  findIndexByID(id) {
    return this.#state.findIndex(i => i.id === id)
  }

  getState() {
    return this.#state;
  }
  getSearch() {   // получение массива данных поиска
    return this.#search
  }

  setRenderFn(renderFn) {
    this.#renderFn = renderFn;
  }
  rerender() {
    this.#renderFn();
  }
}
