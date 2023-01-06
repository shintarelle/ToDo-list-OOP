
const userId = 1;
class ServerTodo {
  constructor(todo) {
  }

  static cookedData (item) {
    return {text: item.title, checked: item.completed, id: item.id, editable: false}
  }

  static async getToDo () {    //!- проверь пожалуйста запросы, я переделывала на async await
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
      const json = await response.json();
      return json.map(ServerTodo.cookedData);
    } catch (e) {
      return alert(e.message);
    }
  };

  static deleteTodo(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    })
  }

  static async createTodo(title) {  //!- проверь пожалуйста запросы, я переделывала на async await
    try {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          completed: false,
          userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!data.ok) {
        throw new Error(data.status);
      }
      const response = data;
      return await response.json();   //! возвращаю ответ сервера но не использую
    } catch (e) {
      return console.log(e.message);
    }
  }

  static async updateData(id, data) {  //!- проверь пожалуйста запросы, я переделывала на async await
    try {
      const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: data.id,
          title: data.text,
          completed: data.checked,
          userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!responce.ok) {
        throw new Error(data.status);
      }
      const json = await responce.json(); //! я возвращаю тут данные но с ними ничего не делаю бо сервер не дает менять
      return json;                        //! меня смущает этот момент

    } catch (e) {
      return console.log(e.message);
    }
  }
}



export default ServerTodo;
