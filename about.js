/**
 * UI Functionalities
 */

import { addItemToList, getTodoList, updateTodoItem } from "./todo.js"

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoItemsContainer = document.getElementById("todo-items");

updateUIWithTodoList();

// Adding necessary event listener
// todoInput.addEventListener("keyup", function (event) {})

todoButton.addEventListener("click", function (event) {
    // get the input value
    const inputValue = todoInput.value;

    // we'll check if its valid(empty or not, at least 5 characters)
    if (inputValue.length < 5) {
        alert("Todo Item must be more that 5 characters");
        return;
    }

    // add it to the todo list array 
    addItemToList(inputValue);

    // clear our input
    todoInput.value = "";

    // loop over it and display it to the UI
    updateUIWithTodoList();
})

// // Todo Item Builder
function buildTodoItem(todoItem) {
    {/* <div id="todo-item" class="flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4">
            <input data-id="2" type="checkbox" class="" />
            <p>The item on my todo list</p>
        </div> */}
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("id", "todo-item");
    const classList = "flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4".split(" ");
    classList.forEach((className) => parentDiv.classList.add(className));
    

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.dataset.id = todoItem.id;

    const todoPara = document.createElement("p");
    const textNode = document.createTextNode(todoItem.title);
    todoPara.appendChild(textNode)
    // todoPara.innerText = todoItem

    parentDiv.append(checkBox)
    parentDiv.append(todoPara)

    todoItemsContainer.append(parentDiv);
}

function updateUIWithTodoList() {
    const updatedTodoList = getTodoList();

    // clear the view
    todoItemsContainer.innerHTML = "";

    // loop over it and display it to the UI
    updatedTodoList.forEach((todoListItem) => {
        buildTodoItem(todoListItem);
    })
}