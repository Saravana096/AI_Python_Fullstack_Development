// ========================================
// 1. DOM Elements
// ========================================

const todoInput =
    document.getElementById("new-todo");

const addBtn =
    document.getElementById("add-btn");

const todoList =
    document.getElementById("todo-list");


// ========================================
// 2. Load Todos from localStorage
// ========================================

let todos =
    JSON.parse(
        localStorage.getItem("todos")
    ) || [];


// ========================================
// 3. Render Todos
// ========================================

function renderTodos() {

    todoList.innerHTML = "";


    todos.forEach(function (todo, index) {

        const li =
            document.createElement("li");


        const span =
            document.createElement("span");

        span.textContent =
            todo.task;

        span.classList.add("todo-text");


        if (todo.completed) {

            span.classList.add("completed");

        }


        const actions =
            document.createElement("div");

        actions.classList.add(
            "todo-actions"
        );


        const completeBtn =
            document.createElement("button");

        completeBtn.textContent = "✓";

        completeBtn.classList.add(
            "complete-btn"
        );

        completeBtn.setAttribute(
            "data-id",
            index
        );


        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "✗";

        deleteBtn.classList.add(
            "delete-btn"
        );

        deleteBtn.setAttribute(
            "data-id",
            index
        );


        actions.appendChild(
            completeBtn
        );

        actions.appendChild(
            deleteBtn
        );


        li.appendChild(span);

        li.appendChild(actions);


        todoList.appendChild(li);

    });

}


// ========================================
// 4. Add New Todo
// ========================================

addBtn.addEventListener(
    "click",
    function () {

        const task =
            todoInput.value.trim();


        if (task === "") {

            alert("Please enter a task.");

            return;

        }


        todos.push({

            task: task,

            completed: false

        });


        saveTodos();


        todoInput.value = "";


        renderTodos();

    }
);


// ========================================
// 5. Complete / Delete Todo
// ========================================

todoList.addEventListener(
    "click",
    function (event) {

        const index =
            event.target.getAttribute(
                "data-id"
            );


        if (
            event.target.classList.contains(
                "complete-btn"
            )
        ) {

            todos[index].completed =
                !todos[index].completed;

        }


        else if (
            event.target.classList.contains(
                "delete-btn"
            )
        ) {

            todos.splice(index, 1);

        }


        saveTodos();

        renderTodos();

    }
);


// ========================================
// 6. Save Todos to localStorage
// ========================================

function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}


// ========================================
// 7. Initial Render
// ========================================

renderTodos();