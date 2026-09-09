const taskInput =
    document.getElementById("taskInput");

const addButton =
    document.getElementById("addButton");

const todoList =
    document.getElementById("todoList");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");


const API_URL =
    "https://jsonplaceholder.typicode.com/todos";


// Load existing todos
loadTodos();


// Add button
addButton.addEventListener(
    "click",
    addTodo
);


// Enter key
taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTodo();

        }

    }
);


// Get todos from API
async function loadTodos() {

    showLoading("Loading tasks...");

    clearError();


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load tasks."
            );

        }


        const todos =
            await response.json();


        // Display only first 10 tasks
        renderTodos(todos.slice(0, 10));


    } catch (error) {

        showError(
            "Unable to load tasks. Please try again."
        );

    } finally {

        hideLoading();

    }

}


// Add new todo
async function addTodo() {

    const task =
        taskInput.value.trim();


    if (task === "") {

        showError(
            "Please enter a task."
        );

        return;

    }


    clearError();

    showLoading("Adding task...");

    addButton.disabled = true;


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    title: task,

                    completed: false,

                    userId: 1

                })

            });


        if (!response.ok) {

            throw new Error(
                "Failed to add task."
            );

        }


        const newTodo =
            await response.json();


        addTodoToDOM(newTodo);


        taskInput.value = "";


    } catch (error) {

        showError(
            "Unable to add task. Please try again."
        );

    } finally {

        hideLoading();

        addButton.disabled = false;

    }

}


// Add one todo to DOM
function addTodoToDOM(todo) {

    const todoItem =
        document.createElement("div");

    todoItem.classList.add(
        "todo-item"
    );


    const taskText =
        document.createElement("span");

    taskText.textContent =
        todo.title;


    todoItem.appendChild(
        taskText
    );


    todoList.appendChild(
        todoItem
    );

}


// Render todos
function renderTodos(todos) {

    todoList.innerHTML = "";


    todos.forEach(function (todo) {

        addTodoToDOM(todo);

    });

}


// Show loading
function showLoading(message) {

    loadingMessage.textContent =
        message;

}


// Hide loading
function hideLoading() {

    loadingMessage.textContent = "";

}


// Show error
function showError(message) {

    errorMessage.textContent =
        message;

}


// Clear error
function clearError() {

    errorMessage.textContent = "";

}