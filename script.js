const state = new Proxy(
  { tasks: [] },
  {
    set: (state, property, newValue) => {
      if (property === "tasks") {
        state[property] = newValue[0];
        const shouldSync = newValue[1];
        if (shouldSync) {
          localStorage.setItem("tasks", JSON.stringify(newValue[0]));
        }
        console.log("Tasks set");
        console.log(state);
      }
    },
  }
);

document.addEventListener("DOMContentLoaded", (e) => {
  function loadTasks() {
    /** @type {string[]} */
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (const task of storedTasks) {
      addTask(task, false);
    }
  }

  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("add-task-btn");

  /** @type {HTMLInputElement} */
  const taskInput = document.getElementById("task-input");

  /** @type {HTMLUListElement} */
  const taskList = document.getElementById("task-list");

  function addTask(taskText, toSync = true) {
    if (!taskText) return alert("Enter a task");

    const newListItem = document.createElement("li");
    newListItem.textContent = taskText;

    const newButton = document.createElement("button");
    newButton.classList.add("remove-btn");
    newButton.textContent = "Remove";
    newButton.addEventListener("click", () => {
      newListItem.remove();
      state.tasks = [state.tasks.filter((t) => t !== taskText), toSync];
    });

    newListItem.appendChild(newButton);
    taskList.appendChild(newListItem);
    taskInput.value = "";

    state.tasks = [[...state.tasks, taskText], toSync];
  }

  addButton.addEventListener("click", (e) => {
    addTask(taskInput.value.trim());
  });
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask(taskInput.value.trim());
    }
  });
  loadTasks();
});
