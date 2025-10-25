document.addEventListener("DOMContentLoaded", (e) => {
  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("add-task-btn");

  /** @type {HTMLInputElement} */
  const taskInput = document.getElementById("task-input");

  /** @type {HTMLUListElement} */
  const taskList = document.getElementById("task-list");

  function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) return alert("Enter a task");

    const newListItem = document.createElement("li");
    newListItem.textContent = taskText;

    const newButton = document.createElement("button");
    newButton.classList.add("remove-btn");
    newButton.textContent = "Remove";
    newButton.addEventListener("click", () => {
      newListItem.remove();
    });

    newListItem.appendChild(newButton);
    taskList.appendChild(newListItem);
    taskInput.value = "";
  }

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
