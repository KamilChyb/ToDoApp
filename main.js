// actual date
const options = {
  weekday: "long",
  month: "short",
  day: "numeric"
};
const date = new Date().toLocaleDateString("en-US", options);
const h1Date = document.querySelector("h1.date");
h1Date.innerHTML = date;

// select the elements
const btnClear = document.querySelector(".fa-sync-alt");
const add = document.querySelector("form.add");
const inputAdd = document.querySelector("input.add");
const search = document.querySelector("input.search");
const taskSpan = document.querySelector("h3 span");
const list = document.querySelector("ul.list");

// array
const tasks = [];

// clear list button
const clearAll = () => {
  let clearTasks = tasks;
  clearTasks.length = 0;
  list.textContent = "";
  taskSpan.textContent = tasks.length;
};

// remove task
const removeTask = e => {
  const index = e.target.parentNode.dataset.key;
  tasks.splice(index, 1);
  taskSpan.textContent = tasks.length;
  renderList();
};

// add task
const addTask = e => {
  e.preventDefault();
  if (inputAdd.value == "") return;
  const task = document.createElement("li");
  task.innerHTML =
    '<i class="far fa-circle"></i></i>' +
    inputAdd.value +
    '<i class="far fa-trash-alt"></i>';
  tasks.push(task);
  renderList();
  list.appendChild(task);
  inputAdd.value = "";
  taskSpan.textContent = tasks.length;
  task.querySelector(".fa-trash-alt").addEventListener("click", removeTask);
  task.querySelector(".fa-circle").addEventListener("click", doneTask);
};

// search task function
const searchTask = e => {
  const searchText = e.target.value.toLowerCase();
  items = tasks.filter(item =>
    item.textContent.toLowerCase().includes(searchText)
  );
  list.textContent = "";
  items.forEach(item => list.appendChild(item));
};

// doneTask function
const doneTask = e => {
  const index = e.target.parentNode.dataset.key;
  e.target.classList.toggle("fa-circle");
  e.target.classList.toggle("fa-check-circle");
  e.target.classList.toggle("fas");
  e.target.classList.toggle("far");
  if (e.target.classList.contains("fas")) {
    tasks[index].style.textDecoration = "line-through";
  } else if (e.target.classList.contains("far")) {
    tasks[index].style.textDecoration = "none";
  }
};

// renderList function
const renderList = () => {
  list.textContent = "";
  tasks.forEach((task, key) => {
    task.dataset.key = key;
    list.appendChild(task);
  });
};

btnClear.addEventListener("click", clearAll);
add.addEventListener("submit", addTask);
search.addEventListener("input", searchTask);
