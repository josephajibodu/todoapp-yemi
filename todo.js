// Requirements 
// - store todo items ✅
// - mark an item has done ✅
// - delete an item
// - edit an item ✅
// - get a particular todo item by id ✅

// PRINCIPLES: Abstraction (OOP)

let MY_TODO_LIST = []; // array of objects
let currentId = 1;

fetchTodoFromDB();

/**
 * This function is used to add item to the list 
 * 
 * @param string theItem 
 */
export function addItemToList(theItem) {
    let todoItem = theItem.trim();

    let todoObj = {
      id: currentId++, // this assigns currentID to id and then increment currentId
      title: todoItem,
      isCompleted: false
    };
    
    MY_TODO_LIST.push(todoObj);
}

/**
 * This function returns the current todo list items
 * 
 * @returns array
 */
export function getTodoList() {
    return [...MY_TODO_LIST];
}

export function getSingleTodoItem(id) {
  const searchedIndex = findTodoItemById(id);
  const todoItem = MY_TODO_LIST[searchedIndex];
  
  return todoItem;
}

export function updateTodoItem(id, theUpdatedValue) {
  const searchedIndex = findTodoItemById(id);
  const todoItem = MY_TODO_LIST[searchedIndex];
  
  // This line copies the properties in todoObj and overrides the title property
  // It will safe you time when the object is much larger
  MY_TODO_LIST[searchedIndex] = {...todoItem, title: theUpdatedValue };
  
  // You can also do this
  // MY_TODO_LIST[searchedIndex] = { id: id, title: theUpdatedValue};
}

export function toggleTodoStatus(id) {
  const searchedIndex = findTodoItemById(id);
  const todoItem = MY_TODO_LIST[searchedIndex];
  
  MY_TODO_LIST[searchedIndex] = {
    ...todoItem, 
    isCompleted: !todoItem.isCompleted // updates status to opposite of current status 
  };
}

export function deleteTodoItem(id) {
  const searchedIndex = findTodoItemById(id);
  
  MY_TODO_LIST.splice(searchedIndex, 1);
}

function findTodoItemById(id) {
  const searchedIndex = MY_TODO_LIST.findIndex((todoItem) => {
    return todoItem.id === id
  });
  

  if (searchedIndex === -1) {
    throw new Error("Todo not found");
  }

  return searchedIndex;
}

function persistToDB() {
  // save the MY_TODO_LIST to local storage
}

function fetchTodoFromDB() {
  // extract data stored in local storage
  // MY_TODO_LIST = the array
}