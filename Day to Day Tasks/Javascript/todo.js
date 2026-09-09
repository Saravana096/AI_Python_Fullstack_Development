const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const clearButton = document.getElementById("clearButton");


let tasks = [];


// Load tasks from localStorage
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

}


// Save tasks to localStorage
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Render tasks
function renderTasks() {

    todoList.innerHTML = "";


    tasks.forEach(function (task, index) {

        // Create main todo div
        const todoItem =
            document.createElement("div");

        todoItem.classList.add("todo-item");


        // Create task text
        const taskText =
            document.createElement("span");

        taskText.classList.add("task-text");

        taskText.textContent = task;


        // Create delete button
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add(
            "delete-button"
        );


        // Delete button click
        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(index);

            }
        );


        // Add elements to todo item
        todoItem.appendChild(taskText);

        todoItem.appendChild(deleteButton);


        // Add todo item to list
        todoList.appendChild(todoItem);

    });

}


// Add task
function addTask() {

    const task =
        taskInput.value.trim();


    if (task === "") {

        alert("Please enter a task.");

        return;

    }


    tasks.push(task);


    saveTasks();

    renderTasks();


    taskInput.value = "";

}


// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();

}


// Clear all tasks
function clearTasks() {

    tasks = [];

    localStorage.removeItem("tasks");

    renderTasks();

}


// Add button event
addButton.addEventListener(
    "click",
    addTask
);


// Enter key event
taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// Clear button event
clearButton.addEventListener(
    "click",
    clearTasks
);


// Display saved tasks
renderTasks();