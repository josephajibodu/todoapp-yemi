class TodoList {
  #MY_TODO_LIST = []; // array of objects
  #currentId = 1;
  #MY_TODO_KEY = "myTodoList";

  constructor() {}

  addItemToList(theItem) {
    let todoItem = theItem.trim();

    let todoObj = {
      id: this.#currentId++, // this assigns this.#currentID to id and then increment currentId
      title: todoItem,
      isCompleted: false,
    };

    this.#MY_TODO_LIST.push(todoObj);
    this.persistToDB();
  }

  getTodoList() {
    return [...this.#MY_TODO_LIST];
  }

  findTodoItemById(id) {
    const searchedIndex = this.#MY_TODO_LIST.findIndex((todoItem) => {
      return todoItem.id === id;
    });

    if (searchedIndex === -1) {
      throw new Error("Todo not found");
    }

    return searchedIndex;
  }

  getSingleTodoItem(id) {
    const searchedIndex = this.findTodoItemById(id);
    const todoItem = this.#MY_TODO_LIST[searchedIndex];

    return todoItem;
  }

  updateTodoItem(id, theUpdatedValue) {
    const searchedIndex = this.findTodoItemById(id);
    const todoItem = this.#MY_TODO_LIST[searchedIndex];

    // This line copies the properties in todoObj and overrides the title property
    // It will safe you time when the object is much larger
    this.#MY_TODO_LIST[searchedIndex] = { ...todoItem, title: theUpdatedValue };
    this.persistToDB();

    // You can also do this
    // this.#MY_TODO_LIST[searchedIndex] = { id: id, title: theUpdatedValue};
  }

  toggleTodoStatus(id) {
    const searchedIndex = this.findTodoItemById(id);
    const todoItem = this.#MY_TODO_LIST[searchedIndex];

    this.#MY_TODO_LIST[searchedIndex] = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted, // updates status to opposite of current status
    };
    this.persistToDB();
  }

  deleteTodoItem(id) {
    const searchedIndex = this.findTodoItemById(id);

    this.#MY_TODO_LIST.splice(searchedIndex, 1);
    this.persistToDB();
  }

  persistToDB() {
    localStorage.setItem(this.#MY_TODO_KEY, JSON.stringify(this.#MY_TODO_LIST));
  }

  fetchTodoFromDB() {
    // extract data stored in local storage
    // this.#MY_TODO_LIST = the array
    let fetchedTodoFromDB = localStorage.getItem(this.#MY_TODO_KEY);
    this.#MY_TODO_LIST = JSON.parse(fetchedTodoFromDB);
  }
}

export default TodoList;
